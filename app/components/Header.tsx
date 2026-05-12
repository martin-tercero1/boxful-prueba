"use client";
import { CreditCardOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { ordersService } from "@/services/orders.service";

interface HeaderProps {
  title: string;
  userName: string | undefined;
  amountToSettle?: number;
}

export default function Header({ title, userName }: HeaderProps) {
  const [amountToSettle, setAmountToSettle] = useState<number | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSettlement = async () => {
      setIsLoading(true);
      try {
        const response = await ordersService.calculateForUser();
        setAmountToSettle(response.data.totalSettlement);
      } catch (error) {
        console.error('Error fetching settlement amount:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettlement();
  }, []);
  return (
    <header className="flex items-center justify-between py-4 px-6 bg-white border-b border-[#e1e9e8]">
      <h1 
        className="text-xl lg:text-2xl text-[#161734]"  
        dangerouslySetInnerHTML={{ __html: title }}
      />
      <div className="flex items-center gap-4">
        {(isLoading || amountToSettle !== undefined || userName) && (
          <>
            {isLoading ? (
              <div className="flex items-center gap-2 bg-[#effdf4] px-4 py-2 rounded-lg">
                <CreditCardOutlined className="text-[#1a5656]" />
                <span className="text-[#161734] text-[16px]">
                  Monto a liquidar <span className="font-semibold text-[#1a5656]">Cargando...</span>
                </span>
              </div>
            ) : amountToSettle !== undefined ? (
              <div className="flex items-center gap-2 bg-[#effdf4] px-4 py-2 rounded-lg">
                <CreditCardOutlined className="text-[#1a5656]" />
                <span className="text-[#161734] text-[16px]">
                  Monto a liquidar <span className="font-semibold text-[#1a5656]">${amountToSettle.toFixed(2)}</span>
                </span>
              </div>
            ) : null}
            {userName && (
              <div className="text-[#161734] text-base lg:text-lg font-medium">
                {userName}
              </div>
            )}
          </>
        )}
      </div>
    </header>
  );
}
