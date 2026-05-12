"use client";

import { useState, useMemo, useEffect } from "react";
import { Table, Button, DatePicker, Checkbox, Empty } from "antd";
import { CalendarOutlined } from "@ant-design/icons";
import type { TableColumnsType } from "antd";
import type { CheckboxChangeEvent } from "antd/es/checkbox";
import type { Order } from "@/types/order.types";
import { ordersService } from "@/services/orders.service";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es";

dayjs.locale("es");

export default function OrderHistory() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs] | null>(null);

  // Fetch orders from API
  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await ordersService.getAll();
      setOrders(response.data.data || []);
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectAll = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setSelectedRowKeys(orders.map((order) => order.id));
    } else {
      setSelectedRowKeys([]);
    }
  };

  const handleRowSelect = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedRowKeys([...selectedRowKeys, id]);
    } else {
      setSelectedRowKeys(selectedRowKeys.filter((key) => key !== id));
    }
  };

  const handleDateFilter = () => {
    // Filter orders based on date range
    const filtered = [...orders];
    if (dateRange) {
      const [startDate, endDate] = dateRange;
      const filteredByDate = filtered.filter((order) => {
        const orderDate = dayjs(order.createdAt);
        return orderDate.isAfter(startDate.startOf("month")) && 
               orderDate.isBefore(endDate.endOf("month"));
      });
      setOrders(filteredByDate);
    } else {
      setOrders(filtered);
    }
  };

  const handleDownloadCSV = () => {
    const selectedOrders = orders.filter((order) =>
      selectedRowKeys.includes(order.id)
    );

    if (selectedOrders.length === 0) return;

    // Create CSV content
    const headers = ["No. de orden", "Nombre", "Apellidos", "Departamento", "Municipio", "Paquetes en orden"];
    const rows = selectedOrders.map((order) => [
      order.reference,
      order.firstNames,
      order.lastNames,
      order.department,
      order.municipality,
      order.products.length.toString(),
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.map((cell) => `"${cell}"`).join(",")),
    ].join("\n");

    // Download CSV
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `ordenes_${dayjs().format("YYYY-MM-DD")}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isAllSelected = orders.length > 0 && selectedRowKeys.length === orders.length;
  const isIndeterminate = selectedRowKeys.length > 0 && selectedRowKeys.length < orders.length;

  const columns: TableColumnsType<Order> = [
    {
      title: (
        <Checkbox
          checked={isAllSelected}
          indeterminate={isIndeterminate}
          onChange={handleSelectAll}
        />
      ),
      key: "select",
      width: 50,
      render: (_, record) => (
        <Checkbox
          checked={selectedRowKeys.includes(record.id)}
          onChange={(e) => handleRowSelect(record.id, e.target.checked)}
        />
      ),
    },
    {
      title: "No. de orden",
      dataIndex: "reference",
      key: "reference",
      width: 140,
      render: (text: string) => (
        <span className="text-[#161734] text-xs font-semibold">{text}</span>
      ),
    },
    {
      title: "Nombre",
      dataIndex: "firstNames",
      key: "firstNames",
      width: 150,
      render: (text: string) => (
        <span className="text-[#4e4c4c] text-xs">{text}</span>
      ),
    },
    {
      title: "Apellidos",
      dataIndex: "lastNames",
      key: "lastNames",
      width: 150,
      render: (text: string) => (
        <span className="text-[#4e4c4c] text-xs">{text}</span>
      ),
    },
    {
      title: "Departamento",
      dataIndex: "department",
      key: "department",
      width: 150,
      render: (text: string) => (
        <span className="text-[#4e4c4c] text-xs">{text}</span>
      ),
    },
    {
      title: "Municipio",
      dataIndex: "municipality",
      key: "municipality",
      width: 150,
      render: (text: string) => (
        <span className="text-[#4e4c4c] text-xs">{text}</span>
      ),
    },
    {
      title: "Paquetes en orden",
      key: "productsCount",
      width: 150,
      align: "center",
      render: (_, record) => (
        <div className="bg-[#EFFDF4] rounded-sm w-6 h-6 inline-block">
          <span className="text-[#73BD28] text-xs font-semibold">
            {record.products.length}
          </span>
        </div>
      ),
    },
  ];

  return (
    <div className="w-full">
      {/* Filters Section */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        {/* Date Range Picker */}
        <DatePicker.RangePicker
          picker="month"
          placeholder={["Mes inicio", "Mes fin"]}
          value={dateRange}
          onChange={(dates) => setDateRange(dates as [Dayjs, Dayjs] | null)}
          format={(value) => value.format("MMMM")}
          suffixIcon={<CalendarOutlined className="text-[#161734]" />}
          className="max-w-52 h-11 rounded-lg border-[#e1e9e8]"
        />

        {/* Filter Button */}
        <Button
          type="primary"
          onClick={handleDateFilter}
          className="h-11 rounded-lg bg-[#2e49ce] font-medium px-6 hover:bg-[#2439a4]"
        >
          Buscar
        </Button>

        {/* Download Button */}
        <Button
          type="default"
          disabled={selectedRowKeys.length === 0}
          onClick={handleDownloadCSV}
          className={`h-11 rounded-lg font-medium px-5 ${
            selectedRowKeys.length > 0 
              ? "border-[#161734] text-[#161734] hover:border-[#2e49ce] hover:text-[#2e49ce]" 
              : "border-[#e1e9e8] text-[#b8b7b7]"
          }`}
        >
          Descargar órdenes
        </Button>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg overflow-hidden border border-[#e1e9e8]">
        <Table
          columns={columns}
          dataSource={orders}
          rowKey="id"
          loading={loading}
          pagination={false}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description="No hay órdenes disponibles"
              />
            ),
          }}
          className="orders-table rounded-lg"
        />
      </div>

      {/* Selected count indicator */}
      {selectedRowKeys.length > 0 && (
        <div className="mt-4 text-sm text-[#4e4c4c]">
          {selectedRowKeys.length} orden{selectedRowKeys.length !== 1 ? "es" : ""} seleccionada{selectedRowKeys.length !== 1 ? "s" : ""}
        </div>
      )}

      <style jsx global>{`
        .orders-table .ant-table-thead > tr > th {
          background-color: #EDEDED !important;
          color: #3B3939 !important;
          font-weight: 500 !important;
          font-size: 14px !important;
          border-bottom: 1px solid #e1e9e8 !important;
          padding: 12px 8px !important;
        }
        .orders-table .ant-table-tbody > tr > td {
          padding: 16px 12px !important;
          border-bottom: 1px solid #f6f6f6 !important;
          background-color: white !important;
        }
        .orders-table .ant-table-tbody > tr:hover > td {
          background-color: #f8f9fa !important;
        }
        .orders-table .ant-table-tbody > tr:last-child > td {
          border-bottom: none !important;
        }
        .orders-table .ant-checkbox-checked .ant-checkbox-inner {
          background-color: #2e49ce !important;
          border-color: #2e49ce !important;
        }
        .orders-table .ant-checkbox-indeterminate .ant-checkbox-inner::after {
          background-color: #2e49ce !important;
        }
      `}</style>
    </div>
  );
}