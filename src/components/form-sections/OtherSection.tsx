import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface OtherSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export function OtherSection({ formData, setFormData }: OtherSectionProps) {
  const handlePreferenceChange = (value: string) => {
    setFormData(prev => {
      const currentPreferences = Array.isArray(prev.shareholdersPreference) 
        ? prev.shareholdersPreference 
        : [];
      const updatedPreferences = currentPreferences.includes(value)
        ? currentPreferences.filter((pref: string) => pref !== value)
        : [...currentPreferences, value];
      return { ...prev, shareholdersPreference: updatedPreferences };
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center pb-6 border-b">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">Other</h2>
        <p className="text-sm text-muted-foreground mt-1">Step 4 of 4</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="shareOptionSchemes">Any share option schemes in operation</Label>
          <Select
            value={formData.shareOptionSchemes}
            onValueChange={(value) => setFormData({ ...formData, shareOptionSchemes: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="outstandingLitigation">Any outstanding litigation</Label>
          <Select
            value={formData.outstandingLitigation}
            onValueChange={(value) => setFormData({ ...formData, outstandingLitigation: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="negativeMediaCoverage">Any negative media coverage</Label>
          <Select
            value={formData.negativeMediaCoverage}
            onValueChange={(value) => setFormData({ ...formData, negativeMediaCoverage: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="definedBenefitScheme">Any defined benefit scheme in operation</Label>
          <Select
            value={formData.definedBenefitScheme}
            onValueChange={(value) => setFormData({ ...formData, definedBenefitScheme: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Shareholders' acquirer preference (select all that apply)</Label>
          <div className="space-y-2">
            {[
              { id: "pe", label: "PE" },
              { id: "trade", label: "Trade" },
              { id: "fo", label: "FO" },
              { id: "noPreference", label: "No Preference" }
            ].map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={Array.isArray(formData.shareholdersPreference) && 
                    formData.shareholdersPreference.includes(option.id)}
                  onCheckedChange={() => handlePreferenceChange(option.id)}
                />
                <Label htmlFor={option.id} className="cursor-pointer">{option.label}</Label>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="additionalInformation">Additional information to enhance buyer search</Label>
          <Textarea
            id="additionalInformation"
            placeholder="Share any additional information that would help with the buyer search"
            value={formData.additionalInformation}
            onChange={(e) => setFormData({ ...formData, additionalInformation: e.target.value })}
            className="min-h-[100px]"
          />
        </div>
      </div>
    </div>
  );
}