namespace :backstage do
  desc "Starts background jobs for CalCentral"
  task :start => :environment do
    Backstage.start
  end

  desc "Stops the CalCentral background jobs"
  task :stop => :environment do
    ProcessControl.grep_kill(/backstage:start/, "TERM")
  end

  desc "Log information about the CalCentral background jobs"
  task :stats => :environment do
    ProcessControl.grep_kill(/backstage:start/, "USR1")
  end

end
