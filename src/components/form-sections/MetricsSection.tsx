
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { useState } from "react";

interface MetricsSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

interface SplitEntry {
  name: string;
  percentage: string;
}

export function MetricsSection({ formData, setFormData }: MetricsSectionProps) {
  const [geographySplits, setGeographySplits] = useState<SplitEntry[]>(
    formData.revenueByGeography ? parseExistingSplits(formData.revenueByGeography) : [{ name: "", percentage: "" }]
  );
  const [customerSplits, setCustomerSplits] = useState<SplitEntry[]>(
    formData.revenueByCustomerType ? parseExistingSplits(formData.revenueByCustomerType) : [{ name: "", percentage: "" }]
  );
  const [productSplits, setProductSplits] = useState<SplitEntry[]>(
    formData.revenueByProductType ? parseExistingSplits(formData.revenueByProductType) : [{ name: "", percentage: "" }]
  );

  function parseExistingSplits(value: string): SplitEntry[] {
    try {
      const parts = value.split(',').map(part => part.trim());
      return parts.map(part => {
        const [name, percentageStr] = part.split('%');
        return {
          name: name.trim(),
          percentage: percentageStr ? percentageStr.trim() : ""
        };
      });
    } catch {
      return [{ name: "", percentage: "" }];
    }
  }

  const updateFormDataFromSplits = (splits: SplitEntry[], field: string) => {
    const value = splits
      .filter(split => split.name && split.percentage)
      .map(split => `${split.name} ${split.percentage}%`)
      .join(', ');
    setFormData({ ...formData, [field]: value });
  };

  const handleAddSplit = (splits: SplitEntry[], setSplits: (splits: SplitEntry[]) => void, field: string) => {
    const newSplits = [...splits, { name: "", percentage: "" }];
    setSplits(newSplits);
    updateFormDataFromSplits(newSplits, field);
  };

  const handleRemoveSplit = (index: number, splits: SplitEntry[], setSplits: (splits: SplitEntry[]) => void, field: string) => {
    const newSplits = splits.filter((_, i) => i !== index);
    setSplits(newSplits);
    updateFormDataFromSplits(newSplits, field);
  };

  const handleSplitChange = (
    index: number,
    field: 'name' | 'percentage',
    value: string,
    splits: SplitEntry[],
    setSplits: (splits: SplitEntry[]) => void,
    formField: string
  ) => {
    const newSplits = splits.map((split, i) =>
      i === index ? { ...split, [field]: value } : split
    );
    setSplits(newSplits);
    updateFormDataFromSplits(newSplits, formField);
  };

  const renderSplitInputs = (
    label: string,
    splits: SplitEntry[],
    setSplits: (splits: SplitEntry[]) => void,
    field: string
  ) => (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="space-y-2">
        {splits.map((split, index) => (
          <div key={index} className="flex gap-2 items-start">
            <div className="flex-1">
              <Input
                placeholder="Enter name"
                value={split.name}
                onChange={(e) => handleSplitChange(index, 'name', e.target.value, splits, setSplits, field)}
              />
            </div>
            <div className="w-24">
              <Input
                type="number"
                placeholder="%"
                value={split.percentage}
                onChange={(e) => handleSplitChange(index, 'percentage', e.target.value, splits, setSplits, field)}
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => handleRemoveSplit(index, splits, setSplits, field)}
              className="px-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => handleAddSplit(splits, setSplits, field)}
          className="mt-2"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add
        </Button>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="text-center pb-6 border-b">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">Metrics</h2>
        <p className="text-sm text-muted-foreground mt-1">Step 3 of 5</p>
      </div>
      <div className="space-y-6">
        {renderSplitInputs(
          "Revenue split by geography",
          geographySplits,
          setGeographySplits,
          'revenueByGeography'
        )}
        {renderSplitInputs(
          "Revenue split by customer type",
          customerSplits,
          setCustomerSplits,
          'revenueByCustomerType'
        )}
        {renderSplitInputs(
          "Revenue split by product/service type",
          productSplits,
          setProductSplits,
          'revenueByProductType'
        )}
        
        <div className="space-y-4">
          <Label>Revenue and EBITDA in £M</Label>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Metric</th>
                  <th className="p-2">Year -2</th>
                  <th className="p-2">Year -1</th>
                  <th className="p-2">Current Year</th>
                  <th className="p-2">Year +1</th>
                  <th className="p-2">Year +2</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="p-2">Revenue</td>
                  <td className="p-2">
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      value={formData.revenueAndEbitda.yearMinus2Revenue}
                      onChange={(e) => setFormData({
                        ...formData,
                        revenueAndEbitda: {
                          ...formData.revenueAndEbitda,
                          yearMinus2Revenue: e.target.value
                        }
                      })}
                    />
                  </td>
                  <td className="p-2">
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      value={formData.revenueAndEbitda.previousYearRevenue}
                      onChange={(e) => setFormData({
                        ...formData,
                        revenueAndEbitda: {
                          ...formData.revenueAndEbitda,
                          previousYearRevenue: e.target.value
                        }
                      })}
                    />
                  </td>
                  <td className="p-2">
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      value={formData.revenueAndEbitda.lastYearRevenue}
                      onChange={(e) => setFormData({
                        ...formData,
                        revenueAndEbitda: {
                          ...formData.revenueAndEbitda,
                          lastYearRevenue: e.target.value
                        }
                      })}
                    />
                  </td>
                  <td className="p-2">
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      value={formData.revenueAndEbitda.year0Revenue}
                      onChange={(e) => setFormData({
                        ...formData,
                        revenueAndEbitda: {
                          ...formData.revenueAndEbitda,
                          year0Revenue: e.target.value
                        }
                      })}
                    />
                  </td>
                  <td className="p-2">
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      value={formData.revenueAndEbitda.fcPlus1Revenue}
                      onChange={(e) => setFormData({
                        ...formData,
                        revenueAndEbitda: {
                          ...formData.revenueAndEbitda,
                          fcPlus1Revenue: e.target.value
                        }
                      })}
                    />
                  </td>
                </tr>
                <tr>
                  <td className="p-2">EBITDA</td>
                  <td className="p-2">
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      value={formData.revenueAndEbitda.yearMinus2Ebitda}
                      onChange={(e) => setFormData({
                        ...formData,
                        revenueAndEbitda: {
                          ...formData.revenueAndEbitda,
                          yearMinus2Ebitda: e.target.value
                        }
                      })}
                    />
                  </td>
                  <td className="p-2">
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      value={formData.revenueAndEbitda.previousYearEbitda}
                      onChange={(e) => setFormData({
                        ...formData,
                        revenueAndEbitda: {
                          ...formData.revenueAndEbitda,
                          previousYearEbitda: e.target.value
                        }
                      })}
                    />
                  </td>
                  <td className="p-2">
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      value={formData.revenueAndEbitda.lastYearEbitda}
                      onChange={(e) => setFormData({
                        ...formData,
                        revenueAndEbitda: {
                          ...formData.revenueAndEbitda,
                          lastYearEbitda: e.target.value
                        }
                      })}
                    />
                  </td>
                  <td className="p-2">
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      value={formData.revenueAndEbitda.year0Ebitda}
                      onChange={(e) => setFormData({
                        ...formData,
                        revenueAndEbitda: {
                          ...formData.revenueAndEbitda,
                          year0Ebitda: e.target.value
                        }
                      })}
                    />
                  </td>
                  <td className="p-2">
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="0.0"
                      value={formData.revenueAndEbitda.fcPlus1Ebitda}
                      onChange={(e) => setFormData({
                        ...formData,
                        revenueAndEbitda: {
                          ...formData.revenueAndEbitda,
                          fcPlus1Ebitda: e.target.value
                        }
                      })}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
