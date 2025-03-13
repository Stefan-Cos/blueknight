
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { RequiredLabel } from "@/components/ui/required-label";

interface BusinessInformationSectionProps {
  formData: any;
  setFormData: (data: any) => void;
  currentKeyword: string;
  setCurrentKeyword: (keyword: string) => void;
  currentIndustry: string;
  setCurrentIndustry: (industry: string) => void;
  currentCompetitor: string;
  setCurrentCompetitor: (competitor: string) => void;
  handleKeywordKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleIndustryKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  handleCompetitorKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  removeKeyword: (index: number) => void;
  removeIndustry: (index: number) => void;
  removeCompetitor: (index: number) => void;
}

export function BusinessInformationSection({
  formData,
  setFormData,
  currentKeyword,
  setCurrentKeyword,
  currentIndustry,
  setCurrentIndustry,
  currentCompetitor,
  setCurrentCompetitor,
  handleKeywordKeyDown,
  handleIndustryKeyDown,
  handleCompetitorKeyDown,
  removeKeyword,
  removeIndustry,
  removeCompetitor,
}: BusinessInformationSectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center pb-6 border-b">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">Business Information</h2>
        <p className="text-sm text-muted-foreground mt-1">Step 2 of 5</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <RequiredLabel htmlFor="companyDescription" required>
            Company description
          </RequiredLabel>
          <Textarea
            id="companyDescription"
            placeholder="Provide a description of your company"
            value={formData.companyDescription}
            onChange={(e) => setFormData({ ...formData, companyDescription: e.target.value })}
            className="min-h-[100px]"
            required
          />
        </div>

        <div className="space-y-2">
          <RequiredLabel htmlFor="productsAndServices" required>
            Describe the products and services
          </RequiredLabel>
          <Textarea
            id="productsAndServices"
            placeholder="Provide a description of the main products and services"
            value={formData.productsAndServices || ""}
            onChange={(e) => setFormData({ ...formData, productsAndServices: e.target.value })}
            className="min-h-[100px]"
            required
          />
        </div>

        <div className="space-y-2">
          <RequiredLabel htmlFor="revenueModel">
            Describe the revenue model for the main products and services
          </RequiredLabel>
          <Textarea
            id="revenueModel"
            placeholder="Describe how the company generates revenue and charges customers for its products and services"
            value={formData.revenueModel || ""}
            onChange={(e) => setFormData({ ...formData, revenueModel: e.target.value })}
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <RequiredLabel htmlFor="uniqueSellingPoints">
            What are the company's Unique Selling Points
          </RequiredLabel>
          <Textarea
            id="uniqueSellingPoints"
            placeholder="Describe what makes the company unique in its market"
            value={formData.uniqueSellingPoints || ""}
            onChange={(e) => setFormData({ ...formData, uniqueSellingPoints: e.target.value })}
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <RequiredLabel htmlFor="sectorKeywords" required>
            Please provide 6 to 9 keywords that could be used to identify the sectors the company is in
          </RequiredLabel>
          <Input
            id="sectorKeywords"
            placeholder="Type keywords and press Enter"
            value={currentKeyword}
            onChange={(e) => setCurrentKeyword(e.target.value)}
            onKeyDown={handleKeywordKeyDown}
            required
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.industryKeywords.map((keyword: string, index: number) => (
              <span 
                key={index} 
                className="bg-primary/10 px-2 py-1 rounded-md text-sm flex items-center gap-1 cursor-pointer"
                onClick={() => removeKeyword(index)}
              >
                {keyword}
                <X className="h-3 w-3" />
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <RequiredLabel>Company's place in value chain</RequiredLabel>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(formData.valueChain).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={value as boolean}
                  onCheckedChange={(checked) =>
                    setFormData(prev => ({
                      ...prev,
                      valueChain: {
                        ...prev.valueChain,
                        [key]: checked === true
                      }
                    }))
                  }
                />
                <RequiredLabel htmlFor={key} className="capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </RequiredLabel>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <RequiredLabel>Business model type</RequiredLabel>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(formData.businessModelType).map(([key, value]) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={value as boolean}
                  onCheckedChange={(checked) =>
                    setFormData(prev => ({
                      ...prev,
                      businessModelType: {
                        ...prev.businessModelType,
                        [key]: checked === true
                      }
                    }))
                  }
                />
                <RequiredLabel htmlFor={key} className="capitalize">
                  {key === 'other' ? 'Other' : key.toUpperCase()}
                </RequiredLabel>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <RequiredLabel htmlFor="targetCustomers" required>
            Describe the company's target customers
          </RequiredLabel>
          <Textarea
            id="targetCustomers"
            placeholder="Describe who the company's ideal customers are"
            value={formData.targetCustomers || ""}
            onChange={(e) => setFormData({ ...formData, targetCustomers: e.target.value })}
            className="min-h-[100px]"
            required
          />
        </div>

        <div className="space-y-2">
          <RequiredLabel htmlFor="customerIndustries" required>
            Industries of the company's customers (The end-user sectors they serve)
          </RequiredLabel>
          <Input
            id="customerIndustries"
            placeholder="Type industry and press Enter"
            value={currentIndustry}
            onChange={(e) => setCurrentIndustry(e.target.value)}
            onKeyDown={handleIndustryKeyDown}
            required
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.customerIndustries.map((industry: string, index: number) => (
              <span 
                key={index} 
                className="bg-primary/10 px-2 py-1 rounded-md text-sm flex items-center gap-1 cursor-pointer"
                onClick={() => removeIndustry(index)}
              >
                {industry}
                <X className="h-3 w-3" />
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <RequiredLabel htmlFor="mainCompetitors" required>
            Main competitors
          </RequiredLabel>
          <Input
            id="mainCompetitors"
            placeholder="Type competitor and press Enter"
            value={currentCompetitor}
            onChange={(e) => setCurrentCompetitor(e.target.value)}
            onKeyDown={handleCompetitorKeyDown}
            required
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {formData.mainCompetitors.map((competitor: string, index: number) => (
              <span 
                key={index} 
                className="bg-primary/10 px-2 py-1 rounded-md text-sm flex items-center gap-1 cursor-pointer"
                onClick={() => removeCompetitor(index)}
              >
                {competitor}
                <X className="h-3 w-3" />
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <RequiredLabel htmlFor="growthPlan">Growth plan</RequiredLabel>
          <Textarea
            id="growthPlan"
            placeholder="Describe the company's growth plans around geography, product and customer expansion"
            value={formData.growthPlan}
            onChange={(e) => setFormData({ ...formData, growthPlan: e.target.value })}
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <RequiredLabel htmlFor="keyIndustryRisks">Key industry risks</RequiredLabel>
          <Textarea
            id="keyIndustryRisks"
            placeholder="Describe the key industry risks impacting the company"
            value={formData.keyIndustryRisks}
            onChange={(e) => setFormData({ ...formData, keyIndustryRisks: e.target.value })}
            className="min-h-[100px]"
          />
        </div>
      </div>
    </div>
  );
}
