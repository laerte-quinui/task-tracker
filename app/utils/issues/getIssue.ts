import { prisma } from "@/prisma/client";

async function getIssue(issueId: string) {
  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(issueId) }
  })

  return issue
}

export default getIssue
