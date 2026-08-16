export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      accounts: {
        Row: {
          account_name: string
          account_number: string | null
          balance: number
          bank_name: string | null
          created_at: string
          currency: string
          iban: string | null
          id: string
          routing_number: string | null
          sort_code: string | null
          status: string
          swift_code: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          account_name: string
          account_number?: string | null
          balance?: number
          bank_name?: string | null
          created_at?: string
          currency: string
          iban?: string | null
          id?: string
          routing_number?: string | null
          sort_code?: string | null
          status?: string
          swift_code?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          account_name?: string
          account_number?: string | null
          balance?: number
          bank_name?: string | null
          created_at?: string
          currency?: string
          iban?: string | null
          id?: string
          routing_number?: string | null
          sort_code?: string | null
          status?: string
          swift_code?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      audit_events: {
        Row: {
          action: string
          actor_email: string | null
          actor_id: string | null
          created_at: string
          id: string
          metadata: Json
          target_id: string | null
          target_type: string | null
        }
        Insert: {
          action: string
          actor_email?: string | null
          actor_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json
          target_id?: string | null
          target_type?: string | null
        }
        Update: {
          action?: string
          actor_email?: string | null
          actor_id?: string | null
          created_at?: string
          id?: string
          metadata?: Json
          target_id?: string | null
          target_type?: string | null
        }
        Relationships: []
      }
      beneficiaries: {
        Row: {
          account_number: string | null
          bank_name: string | null
          created_at: string
          currency: string | null
          id: string
          kind: string
          label: string
          network: string | null
          user_id: string
          wallet_address: string | null
        }
        Insert: {
          account_number?: string | null
          bank_name?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          kind?: string
          label: string
          network?: string | null
          user_id: string
          wallet_address?: string | null
        }
        Update: {
          account_number?: string | null
          bank_name?: string | null
          created_at?: string
          currency?: string | null
          id?: string
          kind?: string
          label?: string
          network?: string | null
          user_id?: string
          wallet_address?: string | null
        }
        Relationships: []
      }
      goals: {
        Row: {
          created_at: string
          currency: string
          icon: string
          id: string
          name: string
          saved_amount: number
          strategy: string
          target_amount: number
          target_date: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          currency?: string
          icon?: string
          id?: string
          name: string
          saved_amount?: number
          strategy?: string
          target_amount: number
          target_date?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          currency?: string
          icon?: string
          id?: string
          name?: string
          saved_amount?: number
          strategy?: string
          target_amount?: number
          target_date?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      kyc_submissions: {
        Row: {
          aml_flag: boolean
          business_name: string | null
          business_reg_number: string | null
          created_at: string
          document_url: string | null
          id: string
          id_number: string
          id_type: string
          kind: string
          review_notes: string | null
          reviewed_at: string | null
          reviewed_by: string | null
          risk_score: number
          selfie_url: string | null
          status: string
          tier_requested: number
          updated_at: string
          user_id: string
        }
        Insert: {
          aml_flag?: boolean
          business_name?: string | null
          business_reg_number?: string | null
          created_at?: string
          document_url?: string | null
          id?: string
          id_number: string
          id_type: string
          kind?: string
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          risk_score?: number
          selfie_url?: string | null
          status?: string
          tier_requested?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          aml_flag?: boolean
          business_name?: string | null
          business_reg_number?: string | null
          created_at?: string
          document_url?: string | null
          id?: string
          id_number?: string
          id_type?: string
          kind?: string
          review_notes?: string | null
          reviewed_at?: string | null
          reviewed_by?: string | null
          risk_score?: number
          selfie_url?: string | null
          status?: string
          tier_requested?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          country: string
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          kyc_status: string
          kyc_tier: number
          phone: string | null
          risk_tolerance: string
          updated_at: string
        }
        Insert: {
          country?: string
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          kyc_status?: string
          kyc_tier?: number
          phone?: string | null
          risk_tolerance?: string
          updated_at?: string
        }
        Update: {
          country?: string
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          kyc_status?: string
          kyc_tier?: number
          phone?: string | null
          risk_tolerance?: string
          updated_at?: string
        }
        Relationships: []
      }
      strategy_positions: {
        Row: {
          amount: number
          created_at: string
          currency: string
          id: string
          projected_apy: string | null
          reference: string | null
          status: string
          strategy: string
          updated_at: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          currency?: string
          id?: string
          projected_apy?: string | null
          reference?: string | null
          status?: string
          strategy: string
          updated_at?: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          currency?: string
          id?: string
          projected_apy?: string | null
          reference?: string | null
          status?: string
          strategy?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      tier_limits: {
        Row: {
          created_at: string
          daily_limit_usd: number
          label: string
          requirements: string
          single_limit_usd: number
          tier: number
        }
        Insert: {
          created_at?: string
          daily_limit_usd: number
          label: string
          requirements: string
          single_limit_usd: number
          tier: number
        }
        Update: {
          created_at?: string
          daily_limit_usd?: number
          label?: string
          requirements?: string
          single_limit_usd?: number
          tier?: number
        }
        Relationships: []
      }
      transactions: {
        Row: {
          account_id: string | null
          amount: number
          chain_tx_hash: string | null
          counterparty: string | null
          created_at: string
          currency: string
          direction: string
          fee: number
          id: string
          kind: string
          reference: string | null
          status: string
          user_id: string
        }
        Insert: {
          account_id?: string | null
          amount: number
          chain_tx_hash?: string | null
          counterparty?: string | null
          created_at?: string
          currency: string
          direction: string
          fee?: number
          id?: string
          kind: string
          reference?: string | null
          status?: string
          user_id: string
        }
        Update: {
          account_id?: string | null
          amount?: number
          chain_tx_hash?: string | null
          counterparty?: string | null
          created_at?: string
          currency?: string
          direction?: string
          fee?: number
          id?: string
          kind?: string
          reference?: string | null
          status?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "transactions_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      wallets: {
        Row: {
          address: string
          chain: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          address: string
          chain?: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          address?: string
          chain?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "ops" | "user"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "ops", "user"],
    },
  },
} as const
