# https://codeinterview.io/JFEHGSNVYK

def team_info
  {
  "team_data": [
    {
      "name": "Ravenclaw",
      "info": {
        "attack": 6,
        "defence": 9,
        "magic": 8,
        "teamwork": 7
      },
      "lore": "Ravenclaw was founded by Rowena Ravenclaw. Ravenclaws are known for their wisdom, cleverness, and wit."
    },
    {
      "name": "Gryffindor",
      "info": {
        "attack": 9,
        "defence": 7,
        "magic": 9,
        "teamwork": 8
      },
      "lore": "Gryffindor was founded by Godric Gryffindor. It was created by Godric Gryffindor. Gryffindors are known for their nerve, chivalry, daring, courage, bravery and determination."
    },
    {
      "name": "Hufflepuff",
      "info": {
        "attack": 7,
        "defence": 7,
        "magic": 7,
        "teamwork": 10
      },
      "lore": "Hufflepuff was founded by the medieval witch Helga Hufflepuff. Hufflepuff is the most inclusive among the four houses; valuing hard work, dedication, patience, loyalty, and fair play rather than a particular aptitude in its members."
    },
    {
      "name": "Slytherin",
      "info": {
        "attack": 7,
        "defence": 8,
        "magic": 9,
        "teamwork": 7
      },
      "lore": "Slytherin was founded by Salazar Slytherin. Slytherins are known for being cunning and ambitious, although it is also known to have produced many Dark witches and wizards."
    }
  ]
}
end


## Background

# We'd like to host a tournament between all of the teams!

# Each team should battle every other team once.
# The team who wins the most matches is the winner of the tournament.

# To determine the winner of a match, we compare the power of the two teams
# A team's power is a function of their team power and lore power

# For example:
#   Gryffindor has a lore power of 5, and a team power of 33,
#   Ravenclaw has a lore power of 20, and a team power of 30.
#
#   Performance for Gryffindor against Ravenclaw is 5 mod 33 = 5.
#   Performance for Ravenclaw against Gryffindor is 20 mod 30 = 20.
#
#   Since 20 > 5, Ravenclaw wins. If a tie happens, return null as the winner.

## Task:

# Complete the Match and Tournament classes below such that you can compute:
# 1. the winner of the tournament
# 2. the number of 'wins' for the winning team

require 'json'

class Match
  attr_reader :teamA, :teamB

  def initialize(teamA, teamB)
    @teamA = teamA
    @teamB = teamB
  end

  def winner
    if power(teamA, teamB) > power(teamB, teamA)
      teamA
    elsif power(teamB, teamA) > power(teamA, teamB)
      teamB
    end
  end

  def power_points(team_name)
    # TODO:  Calculate the team power for the given team.
    #        The team power is the sum of the values in the team's info object.

    team_data(team_name)[:info].values.inject(&:+)

  end

  def lore_points(team_name)
    # Lore power is calculated as the number of words in the team's lore.
    team_data(team_name)[:lore].split(" ").length
  end

  private

  def power(team, opponent)
    lore_points(team) % power_points(opponent)
  end

  def team_data(team_name)
    team_info[:team_data].find {|team| team[:name] == team_name}
  end
end

class Tournament
  def run_matches
  @result = {}
  teams = team_info[:team_data]
  length = teams.length
    0.upto(length-2).each do |i|
      (i+1).upto(length-1).each do |j|
        puts({i: i, j: j})
        match = Match.new(teams[i][:name], teams[j][:name])
        if @result.key? match.winner
          @result[match.winner] += 1
        else
          @result[match.winner] = 1
        end
      end

    end


  end

  def winner
    @result.max[0]
  end

  def win_count(team)
    @result[team]
  end
end

tournament = Tournament.new
tournament.run_matches

puts "Tournament winner: #{tournament.winner}"
puts "Number of wins: #{tournament.win_count(tournament.winner)}"
