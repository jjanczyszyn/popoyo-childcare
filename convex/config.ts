import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Owner-tunable config: phone numbers, WhatsApp, maps link, deposit %, etc.
// Read with `useQuery(api.config.get)`. Defaults applied at first read.

const DEFAULTS: Record<string, string> = {
  ownerWhatsappE164: "+50589750052",
  ownerWhatsappDisplay: "+505 8975 0052",
  secondaryPhoneDisplay: "+505 7718 5403",
  internationalPhoneDisplay: "+1 646 934 0781",
  whatsappLink: "https://wa.me/50589750052",
  mapsLink: "https://share.google/IXOC6DlEv7Zk9d18W",
  depositPercent: "50",
  ownerName: "Karen",
  email: "hello@popoyochildcare.com",
};

export const get = query({
  args: {},
  handler: async (ctx) => {
    const rows = await ctx.db.query("config").collect();
    const out: Record<string, string> = { ...DEFAULTS };
    for (const r of rows) out[r.key] = r.value;
    return out;
  },
});

export const setKey = mutation({
  args: { key: v.string(), value: v.string() },
  handler: async (ctx, { key, value }) => {
    const existing = await ctx.db
      .query("config")
      .withIndex("by_key", (q) => q.eq("key", key))
      .unique();
    if (existing) {
      await ctx.db.patch(existing._id, { value });
    } else {
      await ctx.db.insert("config", { key, value });
    }
  },
});

export const seedDefaults = mutation({
  args: {},
  handler: async (ctx) => {
    for (const [key, value] of Object.entries(DEFAULTS)) {
      const existing = await ctx.db
        .query("config")
        .withIndex("by_key", (q) => q.eq("key", key))
        .unique();
      if (!existing) await ctx.db.insert("config", { key, value });
    }
  },
});
