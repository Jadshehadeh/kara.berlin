import React from "react";
import Layout from "../core/Layout";
import TicketsTable from "../components/tickets";

export default function AdminDashboard() {
  return (
    <Layout title="Tickets Page">
      <TicketsTable />
    </Layout>
  );
}
