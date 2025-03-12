export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      authorized_viewers: {
        Row: {
          created_at: string
          email: string
        }
        Insert: {
          created_at?: string
          email: string
        }
        Update: {
          created_at?: string
          email?: string
        }
        Relationships: []
      }
      form_submissions: {
        Row: {
          accreditations: string | null
          acquisition_reason: string | null
          additional_information: string | null
          advisor_company_name: string
          advisor_email: string
          advisor_full_name: string
          business_model_type: Json
          buyer_countries: string[] | null
          buyer_end_user_sectors: string[] | null
          buyer_industries: string[] | null
          buyer_sector_keywords: string[] | null
          buyers_importance: string | null
          company_description: string | null
          company_name: string
          country_importance: string | null
          created_at: string
          customer_industries: string[] | null
          defined_benefit_scheme: string | null
          end_user_sectors_importance: string | null
          growth_plan: string | null
          id: string
          industries_importance: string | null
          industry_associations: string | null
          industry_keywords: string[] | null
          is_regulated: string
          key_industry_risks: string | null
          keywords_importance: string | null
          main_competitors: string[] | null
          negative_media_coverage: string | null
          outstanding_litigation: string | null
          potential_buyers: string[] | null
          products_and_services: string | null
          project_name: string
          reason_for_selling: string
          reason_importance: string | null
          recent_awards: string | null
          regulatory_bodies: string | null
          revenue_and_ebitda: Json
          revenue_by_customer_type: string | null
          revenue_by_geography: string | null
          revenue_by_product_type: string | null
          revenue_model: string | null
          share_sale_type: string
          shareholders_exit: string
          shareholders_preference: string[] | null
          transition_period: string
          unique_selling_points: string | null
          value_chain: Json
        }
        Insert: {
          accreditations?: string | null
          acquisition_reason?: string | null
          additional_information?: string | null
          advisor_company_name: string
          advisor_email: string
          advisor_full_name: string
          business_model_type?: Json
          buyer_countries?: string[] | null
          buyer_end_user_sectors?: string[] | null
          buyer_industries?: string[] | null
          buyer_sector_keywords?: string[] | null
          buyers_importance?: string | null
          company_description?: string | null
          company_name: string
          country_importance?: string | null
          created_at?: string
          customer_industries?: string[] | null
          defined_benefit_scheme?: string | null
          end_user_sectors_importance?: string | null
          growth_plan?: string | null
          id?: string
          industries_importance?: string | null
          industry_associations?: string | null
          industry_keywords?: string[] | null
          is_regulated: string
          key_industry_risks?: string | null
          keywords_importance?: string | null
          main_competitors?: string[] | null
          negative_media_coverage?: string | null
          outstanding_litigation?: string | null
          potential_buyers?: string[] | null
          products_and_services?: string | null
          project_name: string
          reason_for_selling: string
          reason_importance?: string | null
          recent_awards?: string | null
          regulatory_bodies?: string | null
          revenue_and_ebitda?: Json
          revenue_by_customer_type?: string | null
          revenue_by_geography?: string | null
          revenue_by_product_type?: string | null
          revenue_model?: string | null
          share_sale_type: string
          shareholders_exit: string
          shareholders_preference?: string[] | null
          transition_period: string
          unique_selling_points?: string | null
          value_chain?: Json
        }
        Update: {
          accreditations?: string | null
          acquisition_reason?: string | null
          additional_information?: string | null
          advisor_company_name?: string
          advisor_email?: string
          advisor_full_name?: string
          business_model_type?: Json
          buyer_countries?: string[] | null
          buyer_end_user_sectors?: string[] | null
          buyer_industries?: string[] | null
          buyer_sector_keywords?: string[] | null
          buyers_importance?: string | null
          company_description?: string | null
          company_name?: string
          country_importance?: string | null
          created_at?: string
          customer_industries?: string[] | null
          defined_benefit_scheme?: string | null
          end_user_sectors_importance?: string | null
          growth_plan?: string | null
          id?: string
          industries_importance?: string | null
          industry_associations?: string | null
          industry_keywords?: string[] | null
          is_regulated?: string
          key_industry_risks?: string | null
          keywords_importance?: string | null
          main_competitors?: string[] | null
          negative_media_coverage?: string | null
          outstanding_litigation?: string | null
          potential_buyers?: string[] | null
          products_and_services?: string | null
          project_name?: string
          reason_for_selling?: string
          reason_importance?: string | null
          recent_awards?: string | null
          regulatory_bodies?: string | null
          revenue_and_ebitda?: Json
          revenue_by_customer_type?: string | null
          revenue_by_geography?: string | null
          revenue_by_product_type?: string | null
          revenue_model?: string | null
          share_sale_type?: string
          shareholders_exit?: string
          shareholders_preference?: string[] | null
          transition_period?: string
          unique_selling_points?: string | null
          value_chain?: Json
        }
        Relationships: []
      }
      profiles: {
        Row: {
          company_name: string | null
          created_at: string
          id: string
          updated_at: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Insert: {
          company_name?: string | null
          created_at?: string
          id: string
          updated_at?: string
          user_type: Database["public"]["Enums"]["user_type"]
        }
        Update: {
          company_name?: string | null
          created_at?: string
          id?: string
          updated_at?: string
          user_type?: Database["public"]["Enums"]["user_type"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      user_type: "buyer" | "seller" | "advisor" | "moderator"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
