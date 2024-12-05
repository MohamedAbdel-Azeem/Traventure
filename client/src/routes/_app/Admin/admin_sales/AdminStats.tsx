import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useState, MouseEvent as ReactMouseEvent } from "react";
import { AdminExternalProductrevenue } from "./AdminExternalProductrevenue";
import { AdminUsersNumPage } from "./AdminUsersNumPage";
import { AdminRevenuePage } from "./AdminRevenuePage";
import { AdminSalesPage } from "./AdminSalesPage";

export function AdminStats() {
  const [revenueView, setRevenueView] = useState(0);
  const handleViewChange = (
    event: ReactMouseEvent<HTMLElement>,
    value: number
  ) => {
    setRevenueView(value);
  };

  return (
    <div className="flex flex-col items-center gap-8 pt-6">
      <h1>Admin Stats</h1>
      <ToggleButtonGroup
        color="primary"
        value={revenueView}
        exclusive
        onChange={handleViewChange}
        aria-label="Platform"
      >
        <ToggleButton value={0}>Users Count</ToggleButton>
        <ToggleButton value={1}>Revenues</ToggleButton>
        <ToggleButton value={2}>External products stats</ToggleButton>
        <ToggleButton value={3}>External products Revenues</ToggleButton>
      </ToggleButtonGroup>

      {revenueView === 0 && <AdminUsersNumPage />}
      {revenueView === 1 && <AdminRevenuePage />}
      {revenueView === 2 && <AdminSalesPage />}
      {revenueView === 3 && <AdminExternalProductrevenue />}
    </div>
  );
}
