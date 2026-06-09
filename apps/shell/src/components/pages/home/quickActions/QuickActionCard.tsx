import { Box, Card } from "@superapp/ui";
import { ReactNode } from "react";

interface QuickActionCardProps {
  title: string;
  icon: ReactNode;
  bg?: string;
}

export function QuickActionCard({ bg, icon, title }: QuickActionCardProps) {
  return (
    <Card
      sx={{
        width: 96,
        height: 96,
        borderRadius: 2,
        border: "1px solid #E2E8F0",
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
      }}
    >
      <Box
        sx={{
          width: 48,
          height: 48,
          borderRadius: 1,
          background: bg,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {icon}
      </Box>
      <span className="text-xs font-[600]">{title}</span>
    </Card>
  );
}
