import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";



export default function DashboardLayout({ children }) {
  return (
    <div>
      <Sidebar />
      <Header />

      <div style={{ marginLeft: "240px", marginTop: "80px", padding: "30px" }}>
        {children}
      </div>
    </div>
  );
}