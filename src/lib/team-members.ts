import type { TeamMember } from "@/types/db";

// Several power teams can be active at once: show their members team by team,
// in the order the teams have in admin, then by each member's own order.
export function sortByTeamOrder(members: TeamMember[] | null | undefined, teamIds: string[]): TeamMember[] {
  const rank = new Map(teamIds.map((id, i) => [id, i]));
  const teamRank = (m: TeamMember) => rank.get(m.power_team_id ?? "") ?? 0;
  return [...(members ?? [])].sort((a, b) => teamRank(a) - teamRank(b) || a.sort_order - b.sort_order);
}
