import { sidebarItems } from "../data/mockData";

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="logo">▲</div>
        <div>
          <div className="brand-title">ATLAS</div>
          <div className="brand-subtitle">Infrastructure</div>
        </div>
      </div>

      <nav>
        {sidebarItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <a className={index === 0 ? "nav-item active" : "nav-item"} key={item.label}>
              <Icon size={18} />
              <span>{item.label}</span>
            </a>
          );
        })}
      </nav>
    </aside>
  );
}
