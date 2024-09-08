"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type ControllerRenderProps } from "react-hook-form";
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
  onSubmit: (amount?: number) => void;
};

const schema = z.object({
  amount: z.string().refine((v) => +v > 0, { message: "Amount is required" }),
});

export const PaymentRequestForm = ({ onSubmit }: Props) => {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      amount: "",
    },
    mode: "onTouched",
  });

  async function handleFormSubmit(values: z.infer<typeof schema>) {
    onSubmit(+values.amount);
  }

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<z.infer<typeof schema>, "amount">
  ) {
    const value = event.target.value;

    // Clear form if input is empty
    if (value.length === 0) {
      onSubmit();
    }

    // Only allow numbers and up to 8 decimal places
    if (/^(?!0{2,})\d*(\.\d{0,8})?$/.test(value)) {
      field.onChange(value);
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
                      placeholder=""
                      type="text"
                      {...field}
                      onChange={(event) => handleChange(event, field)}
                      onBlur={() => {
                        form.clearErrors();
                      }}
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
        <Button
          type="submit"
          variant="default"
          className="mt-4 w-full"
          disabled={!form.formState.isValid}
        >
          Create QRCode
        </Button>
      </form>
    </Form>
  );
};
