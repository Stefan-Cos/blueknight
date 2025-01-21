import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";

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
        <p className="text-sm text-muted-foreground mt-1">Step 2 of 4</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="companyDescription">Company description</Label>
          <Textarea
            id="companyDescription"
            placeholder="Provide a description of your company"
            value={formData.companyDescription}
            onChange={(e) => setFormData({ ...formData, companyDescription: e.target.value })}
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="productsAndServices">Describe the products and services</Label>
          <Textarea
            id="productsAndServices"
            placeholder="Provide a description of your products and services"
            value={formData.productsAndServices || ""}
            onChange={(e) => setFormData({ ...formData, productsAndServices: e.target.value })}
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="revenueModel">Describe the revenue model for the main products and services</Label>
          <Textarea
            id="revenueModel"
            placeholder="Explain how your products and services generate revenue"
            value={formData.revenueModel || ""}
            onChange={(e) => setFormData({ ...formData, revenueModel: e.target.value })}
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="industryKeywords">Industry keywords</Label>
          <Input
            id="industryKeywords"
            placeholder="Type keywords and press Enter"
            value={currentKeyword}
            onChange={(e) => setCurrentKeyword(e.target.value)}
            onKeyDown={handleKeywordKeyDown}
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
          <Label>Company's place in value chain</Label>
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
                <Label htmlFor={key} className="capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label>Business model type</Label>
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
                <Label htmlFor={key} className="capitalize">
                  {key === 'other' ? 'Other' : key.toUpperCase()}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="customerIndustries">Industries of your customers</Label>
          <Input
            id="customerIndustries"
            placeholder="Type industry and press Enter"
            value={currentIndustry}
            onChange={(e) => setCurrentIndustry(e.target.value)}
            onKeyDown={handleIndustryKeyDown}
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
          <Label htmlFor="mainCompetitors">Main competitors</Label>
          <Input
            id="mainCompetitors"
            placeholder="Type competitor and press Enter"
            value={currentCompetitor}
            onChange={(e) => setCurrentCompetitor(e.target.value)}
            onKeyDown={handleCompetitorKeyDown}
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
          <Label htmlFor="growthPlan">Growth plan</Label>
          <Textarea
            id="growthPlan"
            placeholder="Describe the company's growth plans around geography, product and customer expansion"
            value={formData.growthPlan}
            onChange={(e) => setFormData({ ...formData, growthPlan: e.target.value })}
            className="min-h-[100px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="keyIndustryRisks">Key industry risks</Label>
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