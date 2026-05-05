import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const childValidator = v.object({
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
});

export const submit = mutation({
  args: {
    serviceSlug: v.string(),
    date: v.string(),
    startTime: v.string(),
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

    parentName: v.string(),
    parentWhatsapp: v.string(),
    parentEmail: v.string(),
    preferredLanguage: v.union(
      v.literal("english"),
      v.literal("spanish"),
      v.literal("either"),
    ),

    propertyName: v.string(),
    area: v.string(),
    locationDetail: v.string(),
    accessNotes: v.optional(v.string()),
    parkingNotes: v.optional(v.string()),
    gateNotes: v.optional(v.string()),

    children: v.array(childValidator),

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

    addOns: v.array(v.string()),

    estimateTotalUsd: v.number(),
    estimateDepositUsd: v.number(),
    estimateRemainingUsd: v.number(),
    estimateBreakdown: v.string(),

    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const year = new Date().getUTCFullYear();
    const rand = Math.floor(Math.random() * 9000 + 1000);
    const code = `PC-${year}-${rand}`;

    const id = await ctx.db.insert("bookings", {
      ...args,
      code,
      status: "requested",
      submittedAt: Date.now(),
    });

    return { id, code };
  },
});

export const listForAdmin = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, { limit }) => {
    const rows = await ctx.db.query("bookings").order("desc").take(limit ?? 50);
    return rows;
  },
});

export const byCode = query({
  args: { code: v.string() },
  handler: async (ctx, { code }) => {
    return await ctx.db
      .query("bookings")
      .withIndex("by_code", (q) => q.eq("code", code))
      .unique();
  },
});
