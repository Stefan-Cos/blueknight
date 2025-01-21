import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OtherSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export function OtherSection({ formData, setFormData }: OtherSectionProps) {
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
          <Label htmlFor="shareholdersPreference">Shareholders' acquirer preference</Label>
          <Select
            value={formData.shareholdersPreference}
            onValueChange={(value) => setFormData({ ...formData, shareholdersPreference: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select preference" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pe">PE</SelectItem>
              <SelectItem value="trade">Trade</SelectItem>
              <SelectItem value="fo">FO</SelectItem>
              <SelectItem value="noPreference">No Preference</SelectItem>
            </SelectContent>
          </Select>
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