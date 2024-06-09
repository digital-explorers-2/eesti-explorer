import React, { useState, useEffect } from "react";
import { PaginationPage } from "@/components/Pagination";
import { paymentsRead } from "@/app/admin/payments/actions";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Payment {
  payment_id: string;
  billing_id: string;
  amount: number;
  user_id: string;
}

export default function Payments() {
  const [payments, setPayments] = useState<Payment[] | undefined>([]);

  useEffect(() => {
    async function fetchPayments() {
      const response = await paymentsRead(); // Assume this returns a promise that resolves to the payments data
      setPayments(response);
    }

    fetchPayments();
  }, []);

  return (
    <div id="tour-guides-section" className="mx-5 mt-12">
      <div className="mt-3 flex flex-col gap-5">
        {payments?.map((payment) => (
          <div
            key={payment.payment_id}
            className="border-[1.3px] rounded-lg px-7 py-2 border-[#D3CBFB] w-[96%] flex gap-15 align-middle justify-between"
          >
            <div className="flex my-2">
              <Avatar className="w-7 h-7">
                <AvatarImage
                  src="https://eurosymbol.eu/img/euro_symbol.jpg"
                  alt="€"
                />
              </Avatar>
            </div>
            <div className="flex my-3 gap-20 justify-between">
              <p className="text-[#797D8C] text-sm">{payment.payment_id}</p>
              <p className="text-sm font-bold">{payment.billing_id}</p>
              <p className="text-[#797D8C] text-sm">{payment.amount} Payment amount</p>
              <p className="text-[#797D8C] text-sm">{payment.user_id}</p>
            </div>
          </div>
        ))}

        <PaginationPage />
      </div>
    </div>
  );
}
