"use client";

import { networkInterfaces } from "os";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { encodeBip21 } from "@/lib/bip21";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

type Props = {
  address: string;
  onSubmit: (bip21?: string) => void;
};

const schema = z.object({
  amount: z.coerce.number().min(0.00000001, "Required"),
});

export const PaymentRequestForm = ({ address, onSubmit }: Props) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: 0,
    },
    mode: "onTouched",
  });

  async function handleFormSubmit(values: z.infer<typeof schema>) {
    const uri = encodeBip21(address, { amount: values.amount });
    onSubmit(uri);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    // Clear form if input is empty
    if (value.length === 0) {
      onSubmit();
    }

    // Only allow numbers and up to 8 decimal places
    // TODO: convert to typeguard to avoid type assertion
    if (/^(?!0{2,})\d*(\.\d{0,8})?$/.test(value)) {
      form.setValue("amount", value as unknown as number);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)}>
        <FormField
          control={form.control}
          name={"amount"}
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Amount"
                      type="text"
                      {...field}
                      onChange={handleChange}
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                      <span className="text-sm text-gray-500">BTC</span>
                    </div>
                  </div>
                </FormControl>
                <FormDescription>
                  Enter the amount of Bitcoin (up to 8 decimal places).
                </FormDescription>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit" variant="default" className="mt-4 w-full">
          Create QRCode
        </Button>
      </form>
    </Form>
  );
};
