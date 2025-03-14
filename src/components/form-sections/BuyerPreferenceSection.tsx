
import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { RequiredLabel } from "@/components/ui/required-label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";

interface BuyerPreferenceSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export function BuyerPreferenceSection({ formData, setFormData }: BuyerPreferenceSectionProps) {
  const [currentCountry, setCurrentCountry] = useState("");
  const [currentIndustry, setCurrentIndustry] = useState("");
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [currentBuyer, setCurrentBuyer] = useState("");
  const [currentEndUserSector, setCurrentEndUserSector] = useState("");

  // Ensure arrays are properly initialized
  useEffect(() => {
    setFormData(prev => {
      const updatedData = { ...prev };
      
      // Ensure all array fields are initialized as arrays
      const arrayFields = [
        'buyerCountries', 
        'buyerIndustries', 
        'buyerSectorKeywords', 
        'buyerEndUserSectors', 
        'potentialBuyers', 
        'shareholdersPreference'
      ];
      
      arrayFields.forEach(field => {
        if (!updatedData[field] || !Array.isArray(updatedData[field])) {
          updatedData[field] = [];
        }
      });
      
      // Set default importance values if not already set
      if (!updatedData.countryImportance) updatedData.countryImportance = "N/A";
      if (!updatedData.industriesImportance) updatedData.industriesImportance = "N/A";
      if (!updatedData.endUserSectorsImportance) updatedData.endUserSectorsImportance = "N/A";
      if (!updatedData.keywordsImportance) updatedData.keywordsImportance = "N/A";
      if (!updatedData.reasonImportance) updatedData.reasonImportance = "N/A";
      if (!updatedData.buyersImportance) updatedData.buyersImportance = "N/A";
      
      return updatedData;
    });
  }, [setFormData]);

  // Handlers for adding items to arrays
  const handleCountryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === 'Tab') && currentCountry.trim()) {
      e.preventDefault();
      addCountry();
    }
  };

  const addCountry = () => {
    if (currentCountry.trim()) {
      setFormData(prev => ({
        ...prev,
        buyerCountries: [...(prev.buyerCountries || []), currentCountry.trim()]
      }));
      setCurrentCountry("");
    }
  };

  const removeCountry = (index: number) => {
    setFormData(prev => ({
      ...prev,
      buyerCountries: (prev.buyerCountries || []).filter((_: string, i: number) => i !== index)
    }));
  };

  const handleIndustryKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === 'Tab') && currentIndustry.trim()) {
      e.preventDefault();
      addIndustry();
    }
  };

  const addIndustry = () => {
    if (currentIndustry.trim()) {
      setFormData(prev => ({
        ...prev,
        buyerIndustries: [...(prev.buyerIndustries || []), currentIndustry.trim()]
      }));
      setCurrentIndustry("");
    }
  };

  const removeIndustry = (index: number) => {
    setFormData(prev => ({
      ...prev,
      buyerIndustries: (prev.buyerIndustries || []).filter((_: string, i: number) => i !== index)
    }));
  };

  const handleKeywordKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === 'Tab') && currentKeyword.trim()) {
      e.preventDefault();
      addKeyword();
    }
  };

  const addKeyword = () => {
    if (currentKeyword.trim()) {
      setFormData(prev => ({
        ...prev,
        buyerSectorKeywords: [...(prev.buyerSectorKeywords || []), currentKeyword.trim()]
      }));
      setCurrentKeyword("");
    }
  };

  const removeKeyword = (index: number) => {
    setFormData(prev => ({
      ...prev,
      buyerSectorKeywords: (prev.buyerSectorKeywords || []).filter((_: string, i: number) => i !== index)
    }));
  };

  const handleBuyerKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === 'Tab') && currentBuyer.trim()) {
      e.preventDefault();
      addBuyer();
    }
  };

  const addBuyer = () => {
    if (currentBuyer.trim()) {
      setFormData(prev => ({
        ...prev,
        potentialBuyers: [...(prev.potentialBuyers || []), currentBuyer.trim()]
      }));
      setCurrentBuyer("");
    }
  };

  const removeBuyer = (index: number) => {
    setFormData(prev => ({
      ...prev,
      potentialBuyers: (prev.potentialBuyers || []).filter((_: string, i: number) => i !== index)
    }));
  };

  const handleEndUserSectorKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === 'Tab') && currentEndUserSector.trim()) {
      e.preventDefault();
      addEndUserSector();
    }
  };

  const addEndUserSector = () => {
    if (currentEndUserSector.trim()) {
      setFormData(prev => ({
        ...prev,
        buyerEndUserSectors: [...(prev.buyerEndUserSectors || []), currentEndUserSector.trim()]
      }));
      setCurrentEndUserSector("");
    }
  };

  const removeEndUserSector = (index: number) => {
    setFormData(prev => ({
      ...prev,
      buyerEndUserSectors: (prev.buyerEndUserSectors || []).filter((_: string, i: number) => i !== index)
    }));
  };

  const getImportanceStyles = (importance: string) => {
    switch (importance?.toLowerCase()) {
      case 'high':
        return 'bg-red-100 hover:bg-red-200 dark:bg-red-900/20 dark:hover:bg-red-800/30';
      case 'medium':
        return 'bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/20 dark:hover:bg-amber-800/30';
      case 'low':
        return 'bg-green-100 hover:bg-green-200 dark:bg-green-900/20 dark:hover:bg-green-800/30';
      case 'n/a':
      default:
        return 'bg-gray-100 hover:bg-gray-200 dark:bg-gray-900/20 dark:hover:bg-gray-800/30';
    }
  };

  const ImportanceSelect = ({ value, onChange, id }: { value: string; onChange: (value: string) => void; id: string }) => (
    <Select value={value || "N/A"} onValueChange={onChange}>
      <SelectTrigger className={cn("w-full", getImportanceStyles(value))}>
        <SelectValue placeholder="N/A" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="N/A" className="bg-gray-100 dark:bg-gray-900/20">N/A</SelectItem>
        <SelectItem value="High" className="bg-red-100 dark:bg-red-900/20">High</SelectItem>
        <SelectItem value="Medium" className="bg-amber-100 dark:bg-amber-900/20">Medium</SelectItem>
        <SelectItem value="Low" className="bg-green-100 dark:bg-green-900/20">Low</SelectItem>
      </SelectContent>
    </Select>
  );

  // Check if arrays have items - used for validation
  const hasCountries = Array.isArray(formData.buyerCountries) && formData.buyerCountries.length > 0;
  const hasIndustries = Array.isArray(formData.buyerIndustries) && formData.buyerIndustries.length > 0;
  const hasEndUserSectors = Array.isArray(formData.buyerEndUserSectors) && formData.buyerEndUserSectors.length > 0;
  const hasKeywords = Array.isArray(formData.buyerSectorKeywords) && formData.buyerSectorKeywords.length > 0;
  const hasBuyers = Array.isArray(formData.potentialBuyers) && formData.potentialBuyers.length > 0;
  const hasShareholdersPreference = Array.isArray(formData.shareholdersPreference) && formData.shareholdersPreference.length > 0;

  return (
    <div className="space-y-6">
      <div className="text-center pb-6 border-b">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">Buyer Preference</h2>
        <p className="text-sm text-muted-foreground mt-1">Step 5 of 5</p>
      </div>
      
      <div className="space-y-6">
        {/* Country of buyer */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start border-b pb-6">
          <div className="md:col-span-4 self-center">
            <RequiredLabel htmlFor="buyerCountries" className="font-medium" required>Country of buyer</RequiredLabel>
            <p className="text-sm text-muted-foreground mt-1">Enter as many countries as you want or use 'Any'</p>
          </div>
          <div className="md:col-span-6 space-y-3 self-center">
            <div className="flex items-center space-x-2">
              <Input
                id="buyerCountries"
                placeholder="Add country or 'Any'"
                value={currentCountry}
                onChange={(e) => setCurrentCountry(e.target.value)}
                onKeyDown={handleCountryKeyDown}
                required={!hasCountries}
                aria-required={!hasCountries}
              />
              <Button type="button" size="icon" variant="ghost" onClick={addCountry} className="h-10 w-10 p-0 flex-shrink-0">
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.buyerCountries?.map((country: string, index: number) => (
                <div key={index} className="flex items-center space-x-1 bg-secondary text-secondary-foreground rounded-md px-2 py-1 text-sm">
                  <span>{country}</span>
                  <Button type="button" variant="ghost" size="sm" className="h-5 w-5 p-0" onClick={() => removeCountry(index)}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-2 self-start pt-0">
            <Label htmlFor="countryImportance">Importance</Label>
            <ImportanceSelect
              id="countryImportance"
              value={formData.countryImportance}
              onChange={(value) => setFormData({ ...formData, countryImportance: value })}
            />
          </div>
        </div>

        {/* Buyer industries */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start border-b pb-6">
          <div className="md:col-span-4 self-center">
            <RequiredLabel htmlFor="buyerIndustries" className="font-medium" required>What industries should the buyer be operating in</RequiredLabel>
            <p className="text-sm text-muted-foreground mt-1">Start with most important or use 'Any'</p>
          </div>
          <div className="md:col-span-6 space-y-3 self-center">
            <div className="flex items-center space-x-2">
              <Input
                id="buyerIndustries"
                placeholder="Add industry or 'Any'"
                value={currentIndustry}
                onChange={(e) => setCurrentIndustry(e.target.value)}
                onKeyDown={handleIndustryKeyDown}
                required={!hasIndustries}
                aria-required={!hasIndustries}
              />
              <Button type="button" size="icon" variant="ghost" onClick={addIndustry} className="h-10 w-10 p-0 flex-shrink-0">
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.buyerIndustries?.map((industry: string, index: number) => (
                <div key={index} className="flex items-center space-x-1 bg-secondary text-secondary-foreground rounded-md px-2 py-1 text-sm">
                  <span>{industry}</span>
                  <Button type="button" variant="ghost" size="sm" className="h-5 w-5 p-0" onClick={() => removeIndustry(index)}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-2 self-start pt-0">
            <Label htmlFor="industriesImportance">Importance</Label>
            <ImportanceSelect
              id="industriesImportance"
              value={formData.industriesImportance}
              onChange={(value) => setFormData({ ...formData, industriesImportance: value })}
            />
          </div>
        </div>

        {/* End-user sectors */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start border-b pb-6">
          <div className="md:col-span-4 self-center">
            <RequiredLabel htmlFor="buyerEndUserSectors" className="font-medium" required>What end-user sectors should the buyer serve</RequiredLabel>
            <p className="text-sm text-muted-foreground mt-1">Start with most important or use 'Any'</p>
          </div>
          <div className="md:col-span-6 space-y-3 self-center">
            <div className="flex items-center space-x-2">
              <Input
                id="buyerEndUserSectors"
                placeholder="Add end-user sector or 'Any'"
                value={currentEndUserSector}
                onChange={(e) => setCurrentEndUserSector(e.target.value)}
                onKeyDown={handleEndUserSectorKeyDown}
                required={!hasEndUserSectors}
                aria-required={!hasEndUserSectors}
              />
              <Button type="button" size="icon" variant="ghost" onClick={addEndUserSector} className="h-10 w-10 p-0 flex-shrink-0">
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.buyerEndUserSectors?.map((sector: string, index: number) => (
                <div key={index} className="flex items-center space-x-1 bg-secondary text-secondary-foreground rounded-md px-2 py-1 text-sm">
                  <span>{sector}</span>
                  <Button type="button" variant="ghost" size="sm" className="h-5 w-5 p-0" onClick={() => removeEndUserSector(index)}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-2 self-start pt-0">
            <Label htmlFor="endUserSectorsImportance">Importance</Label>
            <ImportanceSelect
              id="endUserSectorsImportance"
              value={formData.endUserSectorsImportance}
              onChange={(value) => setFormData({ ...formData, endUserSectorsImportance: value })}
            />
          </div>
        </div>

        {/* Sector keywords */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start border-b pb-6">
          <div className="md:col-span-4 self-center">
            <RequiredLabel htmlFor="buyerSectorKeywords" className="font-medium" required>
              Sector keywords for the buyer
            </RequiredLabel>
            <p className="text-sm text-muted-foreground mt-1">Provide 6 to 9 keywords</p>
          </div>
          <div className="md:col-span-6 space-y-3 self-center">
            <div className="flex items-center space-x-2">
              <Input
                id="buyerSectorKeywords"
                placeholder="Add keyword"
                value={currentKeyword}
                onChange={(e) => setCurrentKeyword(e.target.value)}
                onKeyDown={handleKeywordKeyDown}
                required={!hasKeywords}
                aria-required={!hasKeywords}
              />
              <Button type="button" size="icon" variant="ghost" onClick={addKeyword} className="h-10 w-10 p-0 flex-shrink-0">
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.buyerSectorKeywords?.map((keyword: string, index: number) => (
                <div key={index} className="flex items-center space-x-1 bg-secondary text-secondary-foreground rounded-md px-2 py-1 text-sm">
                  <span>{keyword}</span>
                  <Button type="button" variant="ghost" size="sm" className="h-5 w-5 p-0" onClick={() => removeKeyword(index)}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-2 self-start pt-0">
            <Label htmlFor="keywordsImportance">Importance</Label>
            <ImportanceSelect
              id="keywordsImportance"
              value={formData.keywordsImportance}
              onChange={(value) => setFormData({ ...formData, keywordsImportance: value })}
            />
          </div>
        </div>

        {/* Acquisition reason */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start border-b pb-6">
          <div className="md:col-span-4 self-center">
            <RequiredLabel htmlFor="acquisitionReason" className="font-medium" required>Most likely reason for acquisition</RequiredLabel>
            <p className="text-sm text-muted-foreground mt-1">Why would a buyer acquire this company?</p>
          </div>
          <div className="md:col-span-6 self-start">
            <Select
              value={formData.acquisitionReason}
              onValueChange={(value) => setFormData({ ...formData, acquisitionReason: value })}
              required
            >
              <SelectTrigger>
                <SelectValue placeholder="Select reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="products">To add products/services to portfolio</SelectItem>
                <SelectItem value="customers">To gain access to the customer base</SelectItem>
                <SelectItem value="improvements">To improve their current offerings</SelectItem>
                <SelectItem value="expansion">International expansion</SelectItem>
                <SelectItem value="assets">Access assets/IP</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2 self-start pt-0">
            <Label htmlFor="reasonImportance">Importance</Label>
            <ImportanceSelect
              id="reasonImportance"
              value={formData.reasonImportance}
              onChange={(value) => setFormData({ ...formData, reasonImportance: value })}
            />
          </div>
        </div>

        {/* Potential buyers */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start border-b pb-6">
          <div className="md:col-span-4 self-center">
            <RequiredLabel htmlFor="potentialBuyers" className="font-medium" required>Potential buyers</RequiredLabel>
            <p className="text-sm text-muted-foreground mt-1">List companies that would be a good fit</p>
          </div>
          <div className="md:col-span-6 space-y-3 self-center">
            <div className="flex items-center space-x-2">
              <Input
                id="potentialBuyers"
                placeholder="Add potential buyer"
                value={currentBuyer}
                onChange={(e) => setCurrentBuyer(e.target.value)}
                onKeyDown={handleBuyerKeyDown}
                required={!hasBuyers}
                aria-required={!hasBuyers}
              />
              <Button type="button" size="icon" variant="ghost" onClick={addBuyer} className="h-10 w-10 p-0 flex-shrink-0">
                <Plus className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.potentialBuyers?.map((buyer: string, index: number) => (
                <div key={index} className="flex items-center space-x-1 bg-secondary text-secondary-foreground rounded-md px-2 py-1 text-sm">
                  <span>{buyer}</span>
                  <Button type="button" variant="ghost" size="sm" className="h-5 w-5 p-0" onClick={() => removeBuyer(index)}>
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-2 self-start pt-0">
            <Label htmlFor="buyersImportance">Importance</Label>
            <ImportanceSelect
              id="buyersImportance"
              value={formData.buyersImportance}
              onChange={(value) => setFormData({ ...formData, buyersImportance: value })}
            />
          </div>
        </div>

        {/* Shareholders' acquirer preference */}
        <div className="space-y-2">
          <RequiredLabel className="font-medium" required>Shareholders' acquirer preference</RequiredLabel>
          <div className="flex flex-wrap gap-x-8 gap-y-2 mt-2">
            {[
              { id: "pe", label: "Private Equity" },
              { id: "peBacked", label: "PE-Backed" },
              { id: "trade", label: "Strategic Trade" },
              { id: "noPreference", label: "No Preference" }
            ].map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={Array.isArray(formData.shareholdersPreference) && 
                    formData.shareholdersPreference.includes(option.id)}
                  onCheckedChange={(checked) => {
                    const currentPreferences = Array.isArray(formData.shareholdersPreference) 
                      ? formData.shareholdersPreference 
                      : [];
                    const updatedPreferences = checked
                      ? [...currentPreferences, option.id]
                      : currentPreferences.filter((pref: string) => pref !== option.id);
                    setFormData({ ...formData, shareholdersPreference: updatedPreferences });
                  }}
                  required={!hasShareholdersPreference}
                />
                <Label htmlFor={option.id} className="cursor-pointer">{option.label}</Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
