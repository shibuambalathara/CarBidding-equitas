import {
      relationship,
      select,
      text,
      timestamp,
    } from "@keystone-6/core/fields";
    import { list } from "@keystone-6/core";
    import {
      fieldOptions,
      isAdminList,
      isNotAdmin,
      isSuperAdmin,
    } from "../application/access";

    export const EventType = list({
      access: {
        operation: {
          query: () => true,
          create: isSuperAdmin,
          update: isSuperAdmin,
          delete: isSuperAdmin,
        },
      },
      ui: {
        isHidden: isNotAdmin,
      },
      fields: {
        name: text({
          validation: {
            isRequired: true,
          },
        }),
        events: relationship({
          ref: "Event.eventType",
          many: true,
          ui: {
            createView: { fieldMode: "hidden" },
            itemView: { fieldMode: "read" },
          },
        }),
        users: relationship({
          ref: "User.category",
        }),
        seller:relationship({
          ref:"Seller.vehicleCategory",
          many:true
        }),
        createdAt: timestamp({
          ...fieldOptions,
          defaultValue: { kind: "now" },
        }),
        updatedAt: timestamp({ ...fieldOptions, db: { updatedAt: true } }),
      },
    });