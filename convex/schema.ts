import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  bookings: defineTable({
    code: v.string(), // PC-YYYY-NNN-style human-readable id
    status: v.union(
      v.literal("requested"),
      v.literal("quoted"),
      v.literal("deposit_pending"),
      v.literal("confirmed"),
      v.literal("completed"),
      v.literal("canceled"),
    ),

    // service
    serviceSlug: v.string(),
    date: v.string(), // ISO YYYY-MM-DD
    startTime: v.string(), // HH:MM 24h
    hours: v.number(),
    flexibleTiming: v.boolean(),
    isRecurring: v.union(
      v.literal("no"),
      v.literal("daily"),
      v.literal("weekly"),
      v.literal("custom"),
    ),
    isEventOrRetreat: v.boolean(),
    parentsOnSite: v.boolean(),
    childrenLeaveProperty: v.boolean(),
    poolOrBeach: v.boolean(),

    // parent
    parentName: v.string(),
    parentWhatsapp: v.string(),
    parentEmail: v.string(),
    preferredLanguage: v.union(
      v.literal("english"),
      v.literal("spanish"),
      v.literal("either"),
    ),

    // location
    propertyName: v.string(),
    area: v.string(),
    locationDetail: v.string(), // address or maps link
    accessNotes: v.optional(v.string()),
    parkingNotes: v.optional(v.string()),
    gateNotes: v.optional(v.string()),

    // children (denormalized array)
    children: v.array(
      v.object({
        nameOrNickname: v.string(),
        age: v.string(),
        language: v.optional(v.string()),
        allergies: v.optional(v.string()),
        medicalNotes: v.optional(v.string()),
        specialNeeds: v.optional(v.string()),
        napSchedule: v.optional(v.string()),
        feedingNotes: v.optional(v.string()),
        comfortObjects: v.optional(v.string()),
        screenTimeRules: v.optional(v.string()),
        swimAbility: v.optional(v.string()),
        personalityNotes: v.optional(v.string()),
      }),
    ),

    // safety
    emergencyContact: v.string(),
    localContact: v.optional(v.string()),
    doctorPreference: v.optional(v.string()),
    permitWhatsappContact: v.boolean(),
    permitOffProperty: v.boolean(),
    permitPool: v.boolean(),
    permitBeach: v.boolean(),
    permitOceanSwim: v.boolean(),
    medications: v.boolean(),
    medicationInstructions: v.optional(v.string()),

    // add-ons
    addOns: v.array(v.string()),

    // pricing snapshot at submission
    estimateTotalUsd: v.number(),
    estimateDepositUsd: v.number(),
    estimateRemainingUsd: v.number(),
    estimateBreakdown: v.string(), // JSON-serialized PriceBreakdown

    // misc
    notes: v.optional(v.string()),

    // server-set
    submittedAt: v.number(),
  })
    .index("by_code", ["code"])
    .index("by_status", ["status"])
    .index("by_date", ["date"]),

  config: defineTable({
    key: v.string(),
    value: v.string(),
  }).index("by_key", ["key"]),
});
