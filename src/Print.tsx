import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { view } from "./arcgis";
import {
  outputFormatOptions,
  pageSetupOptions,
  scaleOptions,
} from "./Print.config";
import { print } from "./Print.util";

type IPrintOutput = {
  url: string;
  title: string;
};

const Print = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [printOutputs, setPrintOutputs] = useState<IPrintOutput[]>([]);
  const { register, handleSubmit, getValues } = useForm({
    defaultValues: {
      title: "My Map",
      pageSetup: pageSetupOptions[0].value,
      outputFormat: outputFormatOptions[0].value,
      scale: scaleOptions[0],
    },
  });
  const { refetch: fetchPrint, isFetching: isPrinting } = useQuery(
    ["print"],
    async () => {
      const { title, pageSetup, outputFormat, scale } = getValues();
      const sameTitledPrintOutputs = printOutputs.filter(
        (printOutput) => printOutput.title === title
      );
      const response = await print({
        format: outputFormat,
        layout: pageSetup,
        title: `${title} ${sameTitledPrintOutputs.length + 1}`,
        view,
        scale,
      });
      return response;
    },
    {
      enabled: false,
      onError: (error) => {
        alert("Error printing map");
        console.error(error);
      },
      onSuccess: (data) => {
        setPrintOutputs([
          ...printOutputs,
          {
            url: data.url,
            title: getValues("title"),
          },
        ]);
      },
    }
  );

  useEffect(() => {
    view.ui.add(ref.current!, "top-right");
  }, []);

  const handlePrint = handleSubmit(async (data) => {
    fetchPrint();
  });

  return (
    <div
      ref={ref}
      style={{
        padding: "1rem",
        backgroundColor: "white",
      }}
    >
      <form onSubmit={handlePrint}>
        <input placeholder="title" {...register("title")} />
        <p>Page Setup</p>
        <select {...register("pageSetup", { required: true })}>
          {pageSetupOptions.map((option) => (
            <option
              value={option.value}
              key={`dip-print-page-setup-${option.value}`}
            >
              {option.label}
            </option>
          ))}
        </select>
        <p>Output Format</p>
        <select {...register("outputFormat", { required: true })}>
          {outputFormatOptions.map((option) => (
            <option
              value={option.value}
              key={`dip-print-output-format-${option.value}`}
            >
              {option.label}
            </option>
          ))}
        </select>
        <select {...register("scale", { required: true })}>
          {scaleOptions.map((option) => (
            <option value={option} key={`dip-print-scale-${option}`}>
              {option}
            </option>
          ))}
        </select>
        <button type="submit">{isPrinting ? "Printing..." : "Print"}</button>
      </form>
      <ul>
        {printOutputs.map((printOutput) => (
          <li key={`dip-print-output-${printOutput.title}`}>
            <a href={printOutput.url} target="_blank" rel="noreferrer">
              {printOutput.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Print;
