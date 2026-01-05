import {
  ListChecks,
  Home,
  Users,
  Building2,
  ListPlus,
  ShieldCheck,
  Hourglass,
} from "lucide-react";
import type { Metric, Property, RevenueCategory } from "../types";

export const metricData: Metric[] = [
  {
    title: "Total Listings",
    value: "1,250",

    className: "text-custom-primary",
  },
  {
    title: "Total Tenants",
    value: "3,420",
    className: "text-yellow-700",
  },
  {
    title: "Verified Landlords",
    value: "865",
    className: "text-blue-700",
  },
  {
    title: "Pending Verifications",
    value: "42",
    className: "text-purple-700",
  },
];

// --- Occupancy Chart Data ---
export const occupancyData = [
  { month: "Jan", rate: 800 },
  { month: "Feb", rate: 750 },
  { month: "Mar", rate: 900 },
  { month: "Apr", rate: 1050 },
  { month: "May", rate: 1300 },
  { month: "Jun", rate: 950 },
  { month: "Jul", rate: 1100 },
  { month: "Aug", rate: 700 },
  { month: "Sep", rate: 980 },
  { month: "Oct", rate: 1020 },
  { month: "Nov", rate: 850 },
  { month: "Dec", rate: 920 },
];

// --- Revenue Chart Data ---

export const revenueData: RevenueCategory[] = [
  { name: "Category A", value: 35, color: "#4F46E5" }, // Indigo/Violet
  { name: "Category B", value: 30, color: "#EC4899" }, // Pink/Magenta
  { name: "Category C", value: 20, color: "#FBBF24" }, // Yellow/Amber
  { name: "Category D", value: 15, color: "#10B981" }, // Green/Teal
];

// --- Property Table Data ---

export const propertyData: Property[] = [
  {
    id: "1",
    property: "Maple Grove Apartments",
    location: "Lekki Phase 1, Lagos",
    landlord: "John Ade",
    occupancyRate: 0.94,
    revenue: 4200000,
    bookings: 128,
    category: "Serviced",
  },
  {
    id: "2",
    property: "Harmony Court",
    location: "Ikeja GRA",
    landlord: "John Ade",
    occupancyRate: 0.94,
    revenue: 4200000,
    bookings: 128,
    category: "Shared",
  },
  {
    id: "3",
    property: "Ocean View Suites",
    location: "Victoria Island",
    landlord: "John Ade",
    occupancyRate: 0.94,
    revenue: 4200000,
    bookings: 128,
    category: "Shared",
  },
  {
    id: "4",
    property: "Greenfield Residences",
    location: "Yaba",
    landlord: "John Ade",
    occupancyRate: 0.94,
    revenue: 4200000,
    bookings: 128,
    category: "Short let",
  },
  {
    id: "5",
    property: "Prime Towers",
    location: "Ikoyi",
    landlord: "John Ade",
    occupancyRate: 0.94,
    revenue: 4200000,
    bookings: 128,
    category: "Short let",
  },
];
