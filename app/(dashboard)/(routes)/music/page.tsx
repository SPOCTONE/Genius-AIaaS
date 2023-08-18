"use client";

import { formSchema } from "./constants";

import { Heading } from "@/components/heading"
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Empty } from "@/components/empty";
import { Loader } from "@/components/loader";

import axios from "axios";
import * as z from "zod";
import { Music } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { ChatCompletionRequestMessage } from "openai";
import { useState } from "react";

const MusicPage = () => {
    const router = useRouter();
    const [music, setMusic] = useState<string>();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: ""
        }
    });

    const isLoading = form.formState.isSubmitting;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setMusic(undefined);
            
            const response = await axios.post('/api/music', values);
            
            setMusic(response.data.audio);
            form.reset();
        } catch (error: any) {
            // TODO: Open Pro Model
            console.log(error);
        } finally {
            router.refresh();
        }
    }

  return (
    <div>
        <Heading
            title="Music Generation"
            description="Turn your prompt into music."
            icon={Music}
            iconColor="text-emerald-500"
            bgColor="bg-emerald-500/10"
        />
        <div className="px-4 lg:px-8">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="
                            rounded-lg
                            border
                            wifull
                            p-4
                            px-3
                            md:px-6focus-within:shadow-sm
                            grid
                            grid-cols-12
                            gap-2
                        "
                    >
                        <FormField
                            name="prompt"
                            render={({ field }) => (
                                <FormItem className="col-span-12 lg:col-span-10">
                                    <FormControl className="m-0 p-0">
                                        <Input 
                                        className="border-0 outline-none 
                                        focus-visible:ring-0 
                                        focus-visisble:ring-transparent"
                                        disabled={isLoading}
                                        placeholder="Start typing here..."
                                        {...field}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <Button className="col-span-12 lg:col-soan-2 w-full" 
                        disabled={isLoading}>
                            Generate
                        </Button>
                    </form>
                </Form>
                {isLoading && (
                <div className="p-20">
                    <Loader />
                </div>
                )}
                {!music && !isLoading && (
                <Empty label="No music generated." />
                )}
                {music && (
                <audio controls className="w-full mt-8">
                    <source src={music} />
                </audio>
                )}
        </div>
    </div>
  );
}

export default MusicPage;