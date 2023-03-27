import { Stack } from "@chakra-ui/react"
import {
  RiContactsLine,
  RiDashboardLine,
  RiShoppingCartLine,
  RiPriceTag2Line,
  RiShieldUserLine,
  RiChat1Line,
  RiRunLine,
} from "react-icons/ri"
import { NavLink } from "./NavLink"
import { NavSection } from "./NavSection"

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink href="/dashboard" icon={RiDashboardLine}>
          Dashboard
        </NavLink>
        <NavLink href="/users" icon={RiContactsLine}>
          Usuários
        </NavLink>
        <NavLink href="/users" icon={RiShieldUserLine}>
          Perfis
        </NavLink>
        <NavLink href="/chat" icon={RiChat1Line}>
          Chat
        </NavLink>
      </NavSection>

      <NavSection title="Vendas">
        <NavLink href="/produtos" icon={RiPriceTag2Line}>
          Produtos
        </NavLink>
        <NavLink href="/vendas" icon={RiShoppingCartLine}>
          Vender
        </NavLink>
      </NavSection>

      <NavSection title="Treinos">
        <NavLink href="/treinos" icon={RiRunLine}>
          Treinos
        </NavLink>
      </NavSection>
    </Stack>
  )
}
