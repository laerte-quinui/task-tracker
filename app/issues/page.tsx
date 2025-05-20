import IssuesTable from "./IssuesTable"
import NewIssueButton from "./NewIssueButton"

const IssuesPage = async () => {
  return (
    <div>
      <div className="flex mb-4">
        <NewIssueButton />
      </div>

      <IssuesTable />
    </div>
  )
}

export default IssuesPage
