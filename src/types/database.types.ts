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
        PostgrestVersion: "14.1"
    }
    public: {
        Tables: {
            expenses: {
                Row: {
                    amount: number
                    category: string
                    created_at: string
                    created_by: string | null
                    description: string | null
                    expense_date: string
                    id: string
                    proof_url: string | null
                }
                Insert: {
                    amount: number
                    category: string
                    created_at?: string
                    created_by?: string | null
                    description?: string | null
                    expense_date?: string
                    id?: string
                    proof_url?: string | null
                }
                Update: {
                    amount?: number
                    category?: string
                    created_at?: string
                    created_by?: string | null
                    description?: string | null
                    expense_date?: string
                    id?: string
                    proof_url?: string | null
                }
                Relationships: []
            }
            members: {
                Row: {
                    created_at: string
                    email: string | null
                    full_name: string
                    id: string
                    monthly_fee: number
                    phone: string | null
                    status: string
                    updated_at: string
                    user_id: string | null
                }
                Insert: {
                    created_at?: string
                    email?: string | null
                    full_name: string
                    id?: string
                    monthly_fee?: number
                    phone?: string | null
                    status?: string
                    updated_at?: string
                    user_id?: string | null
                }
                Update: {
                    created_at?: string
                    email?: string | null
                    full_name?: string
                    id?: string
                    monthly_fee?: number
                    phone?: string | null
                    status?: string
                    updated_at?: string
                    user_id?: string | null
                }
                Relationships: []
            }
            monthly_reports: {
                Row: {
                    generated_at: string
                    id: string
                    net_balance: number
                    report_month: number
                    report_pdf_url: string | null
                    report_year: number
                    total_expense: number
                    total_income: number
                }
                Insert: {
                    generated_at?: string
                    id?: string
                    net_balance?: number
                    report_month: number
                    report_pdf_url?: string | null
                    report_year: number
                    total_expense?: number
                    total_income?: number
                }
                Update: {
                    generated_at?: string
                    id?: string
                    net_balance?: number
                    report_month?: number
                    report_pdf_url?: string | null
                    report_year?: number
                    total_expense?: number
                    total_income?: number
                }
                Relationships: []
            }
            payments: {
                Row: {
                    amount: number
                    created_at: string
                    created_by: string | null
                    id: string
                    invoice_number: string
                    member_id: string
                    method: string
                    payment_date: string
                    period_month: number
                    period_year: number
                    proof_url: string | null
                    receipt_pdf_url: string | null
                }
                Insert: {
                    amount: number
                    created_at?: string
                    created_by?: string | null
                    id?: string
                    invoice_number: string
                    member_id: string
                    method?: string
                    payment_date?: string
                    period_month: number
                    period_year: number
                    proof_url?: string | null
                    receipt_pdf_url?: string | null
                }
                Update: {
                    amount?: number
                    created_at?: string
                    created_by?: string | null
                    id?: string
                    invoice_number?: string
                    member_id?: string
                    method?: string
                    payment_date?: string
                    period_month?: number
                    period_year?: number
                    proof_url?: string | null
                    receipt_pdf_url?: string | null
                }
                Relationships: [
                    {
                        foreignKeyName: "payments_member_id_fkey"
                        columns: ["member_id"]
                        isOneToOne: false
                        referencedRelation: "members"
                        referencedColumns: ["id"]
                    },
                ]
            }
            profiles: {
                Row: {
                    created_at: string
                    email: string | null
                    full_name: string
                    id: string
                    phone: string | null
                    updated_at: string
                }
                Insert: {
                    created_at?: string
                    email?: string | null
                    full_name?: string
                    id: string
                    phone?: string | null
                    updated_at?: string
                }
                Update: {
                    created_at?: string
                    email?: string | null
                    full_name?: string
                    id?: string
                    phone?: string | null
                    updated_at?: string
                }
                Relationships: []
            }
            user_roles: {
                Row: {
                    id: string
                    role: Database["public"]["Enums"]["app_role"]
                    user_id: string
                }
                Insert: {
                    id?: string
                    role: Database["public"]["Enums"]["app_role"]
                    user_id: string
                }
                Update: {
                    id?: string
                    role?: Database["public"]["Enums"]["app_role"]
                    user_id?: string
                }
                Relationships: []
            }
        }
        Views: {
            financial_summary: {
                Row: {
                    balance: number | null
                    expense_this_month: number | null
                    income_this_month: number | null
                    total_expense: number | null
                    total_income: number | null
                }
                Relationships: []
            }
            member_stats: {
                Row: {
                    active_count: number | null
                    inactive_count: number | null
                    total_count: number | null
                }
                Relationships: []
            }
        }
        Functions: {
            generate_invoice_number: {
                Args: { p_month: number; p_year: number }
                Returns: string
            }
            get_my_role: { Args: never; Returns: string }
            has_role: {
                Args: {
                    _role: Database["public"]["Enums"]["app_role"]
                    _user_id: string
                }
                Returns: boolean
            }
        }
        Enums: {
            app_role: "admin" | "member"
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
            app_role: ["admin", "member"],
        },
    },
} as const
