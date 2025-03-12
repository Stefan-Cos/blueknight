
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OverviewSectionProps {
  formData: any;
  setFormData: (data: any) => void;
}

export function OverviewSection({ formData, setFormData }: OverviewSectionProps) {
  return (
    <div className="space-y-6">
      <div className="text-center pb-6 border-b">
        <h2 className="text-2xl font-semibold bg-gradient-to-r from-primary/80 to-primary bg-clip-text text-transparent">Overview</h2>
        <p className="text-sm text-muted-foreground mt-1">Step 1 of 4</p>
      </div>
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="projectName">Project name</Label>
          <Input
            id="projectName"
            placeholder="Enter project name"
            value={formData.projectName}
            onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyName">Company legal name</Label>
          <Input
            id="companyName"
            placeholder="Enter company legal name"
            value={formData.companyName}
            onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="shareSaleType">Share sale type</Label>
          <Select
            value={formData.shareSaleType}
            onValueChange={(value) => setFormData({ ...formData, shareSaleType: value })}
          >
            <SelectTrigger className="self-center">
              <SelectValue placeholder="Select sale type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full">Full sale</SelectItem>
              <SelectItem value="partial">Partial sale</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="shareholdersExit">
            All shareholders/director(s) intending to exit
          </Label>
          <Select
            value={formData.shareholdersExit}
            onValueChange={(value) => setFormData({ ...formData, shareholdersExit: value })}
          >
            <SelectTrigger className="self-center">
              <SelectValue placeholder="Select option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="transitionPeriod">
            Managing director/CEO - transition period
          </Label>
          <Select
            value={formData.transitionPeriod}
            onValueChange={(value) => setFormData({ ...formData, transitionPeriod: value })}
          >
            <SelectTrigger className="self-center">
              <SelectValue placeholder="Select transition period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3-6">3 - 6 months</SelectItem>
              <SelectItem value="6-12">6 - 12 months</SelectItem>
              <SelectItem value="12+">12+ months</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="reasonForSelling">Reason for selling</Label>
          <Textarea
            id="reasonForSelling"
            placeholder="Please provide reasons for selling"
            value={formData.reasonForSelling}
            onChange={(e) => setFormData({ ...formData, reasonForSelling: e.target.value })}
            className="min-h-[100px]"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="regulatoryBodies">If the company is regulated please list the governing bodies</Label>
          <Textarea
            id="regulatoryBodies"
            placeholder="Please list governing bodies if applicable"
            value={formData.regulatoryBodies}
            onChange={(e) => setFormData({ ...formData, regulatoryBodies: e.target.value })}
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="accreditations">If the company has achieved accreditations please list them</Label>
          <Textarea
            id="accreditations"
            placeholder="Please list accreditations if applicable"
            value={formData.accreditations}
            onChange={(e) => setFormData({ ...formData, accreditations: e.target.value })}
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="industryAssociations">If the company is a member of any industry associations please list them</Label>
          <Textarea
            id="industryAssociations"
            placeholder="Please list industry associations if applicable"
            value={formData.industryAssociations}
            onChange={(e) => setFormData({ ...formData, industryAssociations: e.target.value })}
            className="min-h-[80px]"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="recentAwards">If the company has won any awards recently please list them</Label>
          <Textarea
            id="recentAwards"
            placeholder="Please list recent awards if applicable"
            value={formData.recentAwards}
            onChange={(e) => setFormData({ ...formData, recentAwards: e.target.value })}
            className="min-h-[80px]"
          />
        </div>
      </div>
    </div>
  );
}
