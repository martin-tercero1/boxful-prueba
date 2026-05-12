"use client";

import { Card, Switch, InputNumber } from "antd";

interface CashOnDeliveryData {
  cashOnDelivery: boolean;
  cashAmount?: number;
}

interface CashOnDeliverySectionProps {
  data: CashOnDeliveryData;
  onChange: (data: CashOnDeliveryData) => void;
}

export default function CashOnDeliverySection({
  data,
  onChange,
}: CashOnDeliverySectionProps) {
  const handleSwitchChange = (checked: boolean) => {
    onChange({
      cashOnDelivery: checked,
      cashAmount: checked ? data.cashAmount : undefined,
    });
  };

  const handleAmountChange = (value: number | null) => {
    onChange({
      ...data,
      cashAmount: value ?? undefined,
    });
  };

  return (
    <Card
      className="rounded-lg mb-6"
      style={{ border: "1px solid #e1e9e8", backgroundColor: "#FFF4F1" }}
      styles={{ body: { padding: "24px" } }}
    >

      <div className="flex justify-between items-center">
        <h2 className="text-lg font-bold text-[#161734]">
          Pago contra entrega (PCE)
        </h2>
        <Switch
          checked={data.cashOnDelivery}
          onChange={handleSwitchChange}
          size="default"
          styles={{ root: { backgroundColor: data.cashOnDelivery ? "#73BD28" : "#e1e9e8" } }}
        />
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <span className="text-[#636060] text-sm">Tu cliente paga el <span className="font-semibold">monto que indiques</span> al momento de la entrega</span>
          <InputNumber
            value={data.cashAmount}
            onChange={handleAmountChange}
            disabled={!data.cashOnDelivery}
            min={0}
            precision={2}
            placeholder="0.00"
            prefix={<span className="mr-24">$</span>}
            style={{
              width: "181px",
              height: "48px",
              borderRadius: "8px",
              opacity: data.cashOnDelivery ? 1 : 0.5,
            }}
            controls={false}
          />
        </div>
      </div>

    </Card>
  );
}