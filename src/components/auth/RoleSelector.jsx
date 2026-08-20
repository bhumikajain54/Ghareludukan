import React from "react";
import { User, Store } from "lucide-react";

export default function RoleSelector({ role, onRoleChange }) {
  const roles = [
    { k: "customer", label: "I'm a Customer", Icon: User, activeCls: "bg-cyan-600 text-white shadow-md shadow-cyan-600/30" },
    { k: "seller", label: "I Run a Shop", Icon: Store, activeCls: "bg-indigo-600 text-white shadow-md shadow-indigo-600/30" },
  ];

  return (
    <div className="grid grid-cols-2 gap-2.5 p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200 my-4">
      {roles.map(({ k, label, Icon, activeCls }) => {
        const active = role === k;
        return (
          <button
            key={k}
            type="button"
            onClick={() => onRoleChange(k)}
            className={`flex items-center justify-center gap-2 py-3 px-3 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer ${
              active
                ? activeCls
                : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
            }`}
          >
            <Icon size={16} />
            <span>{label}</span>
          </button>
        );
      })}
    </div>
  );
}
