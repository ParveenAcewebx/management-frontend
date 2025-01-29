"use client";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useGetExpCat } from "@/hooks/blog/use-get-catsubcat";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { format } from "date-fns"




import { CreateExpenseForm, createExpenseFormSchema } from '@/schemas/expense-schema'



const getCategoryOptions = (list: string[] | undefined) => {
  if (!list || !list.length) return [];

  return list.map((item) => ({
    id: item.categoryName,
    label: item.categoryName,
    value: item.categoryName,
  }));
};

const getSubCategoryOptions = (expenseCategoryData:string[], selectedcategory:string) => {
  if (!selectedcategory || !selectedcategory.length) return [];
  const cat = expenseCategoryData.filter(
    (cat) => cat.categoryName === selectedcategory
  );

  const subCat = cat[0].subCategory;
  return subCat.map((item) => ({
    id: item,
    label: item,
    value: item,
  }));
};

export default function Page() {
  const form = useForm<CreateExpenseForm>({
    resolver: zodResolver(createExpenseFormSchema),
    defaultValues: {
      expenseName: "",
      description: "",
      expenseDate: new Date(),
      category: "",
    },
  });

  const selectedcategory = form.watch("category");
  const { data: expCat, isPending, isError, error } = useGetExpCat();
console.log("expCat",expCat)
  const expenseCategoryData = expCat?.data.data; 

  const categories = getCategoryOptions(expenseCategoryData);
  const subCategories = getSubCategoryOptions( expenseCategoryData, selectedcategory );
  if (isError) throw new Error(error.message);

  function handleSubmit(values: CreateExpenseForm) {
    console.log("values", values);
    // const { terms: _, ...createTeamInput } = values

    // createTeam.mutate(createTeamInput, {
    //   onSuccess: () => {
    //     form.reset()
    //     onClose()
    //   }
    // })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <section className="py-6 container space-y-10">
          <h1 className="text-4xl font-bold text-primary">Blog</h1>
          <Form {...form}>
            <div className=" m-auto grid grid-cols-3 gap-4 w-full">
              <FormField
                control={form.control}
                name="expenseName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Expense Name</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>Please enter the Expense.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormDescription>
                      Please enter the expense description.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              

              <FormField
                control={form.control}
                name="expenseDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Expense Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick the expance date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date > new Date() || date < new Date("1900-01-01")
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                   
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a league" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subCat"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sub Category</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={isPending || isError}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue
                            placeholder={
                              isPending ? "Loading..." : "Select a team"
                            }
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subCategories?.map((teamOption) => (
                          <SelectItem
                            key={teamOption.id}
                            value={teamOption.value}
                          >
                            {teamOption.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </Form>
          <div className="flex justify-end">
            <Button type="submit">Submit</Button>
          </div>
        </section>
      </form>
    </Form>
  );
}
