# Query for top GitHub projects that don't yet have samples.

$ErrorActionPreference = 'Stop'
function main() {

  $topProjects = queryTopProjects
  $needSamples = $topProjects | filterProjectsWithoutSsamples

  outputSummary $needSamples
}

function queryTopProjects {
  $targetNumProjects = 100
  $lastUpdatedFilter = [TimeSpan]::FromDays(365)
  $urlFormat = 'https://api.github.com/search/repositories?q=pushed:>{0}&sort=stars&per_page={1}'

  $githubUrl = $urlFormat -f ([DateTime]::Today - $lastUpdatedFilter).ToString('yyyy-MM-dd'), $targetNumProjects
  $rawResults = Invoke-RestMethod -Uri $githubUrl
  $rawProjects = $rawResults.items

  $rawProjects |% {
    New-Object PSObject -Property @{
      Name = $_.Name
      Url = New-Object Uri $_.html_url
      Language = $_.language
      Stars = $_.stargazers_count
      Watchers = $_.watchers_count
      LastUpdated = [DateTimeOffset]::Parse($_.pushed_at)
    }
  }
}

filter filterProjectsWithoutSsamples {
  if (-not (testHasSample $_)) {
    $_
  }
}

function testHasSample($project) {
  $expectedProjectPath = Join-Path $PWD $project.Name
  Test-Path $expectedProjectPath
}

function outputSummary($projects) {
  $projects | Format-Table Name, Stars, Url
}


main | more
