
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MetricsSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export function MetricsSection({ formData, setFormData }: MetricsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center pb-6 border-b">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">Metrics</h2>
        <p className="text-sm text-muted-foreground mt-1">Step 3 of 4</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="revenueByGeography">Revenue split by geography</Label>
          <Input
            id="revenueByGeography"
            placeholder="e.g., 70% in the UK, 20% in Ireland"
            value={formData.revenueByGeography}
            onChange={(e) => setFormData({ ...formData, revenueByGeography: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="revenueByCustomerType">Revenue split by customer type</Label>
          <Input
            id="revenueByCustomerType"
            placeholder="e.g., 70% in life sciences"
            value={formData.revenueByCustomerType}
            onChange={(e) => setFormData({ ...formData, revenueByCustomerType: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="revenueByProductType">Revenue split by product/service type</Label>
          <Input
            id="revenueByProductType"
            placeholder="e.g., 70% are training modules on a subscription basis"
            value={formData.revenueByProductType}
            onChange={(e) => setFormData({ ...formData, revenueByProductType: e.target.value })}
          />
        </div>

        <div className="space-y-4">
          <Label>Revenue and EBITDA in £M</Label>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left">Metric</th>
                  <th className="p-2">Year -2</th>
                  <th className="p-2">Year -1</th>
                  <th className="p-2">Current Year 0</th>
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
                        <td className="p-2">
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="0.0"
                            value={formData.revenueAndEbitda.fcPlus2Revenue}
                            onChange={(e) => setFormData({
                              ...formData,
                              revenueAndEbitda: {
                                ...formData.revenueAndEbitda,
                                fcPlus2Revenue: e.target.value
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
                        <td className="p-2">
                          <Input
                            type="number"
                            step="0.1"
                            placeholder="0.0"
                            value={formData.revenueAndEbitda.fcPlus2Ebitda}
                            onChange={(e) => setFormData({
                              ...formData,
                              revenueAndEbitda: {
                                ...formData.revenueAndEbitda,
                                fcPlus2Ebitda: e.target.value
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
