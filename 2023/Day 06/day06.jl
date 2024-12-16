# SPDX-License-Identifier: MIT-0
# License-Filename: LICENSE

# Advent of Code 2023
# --- Day 6: Wait For It ---
# Michael A. Persico (M-PERSIC)
# https://github.com/M-PERSIC

function part_one(input::String)
    race_times = parse.(Int, String.(split(split(split(read(input, String), "\n")[1], ":")[2])))
    race_distances = parse.(Int, String.(split(split(split(read(input, String), "\n")[2], ":")[2])))
    num_ways = zeros(Int, length(race_times))
    for (race, race_time) in enumerate(race_times)
        for i in 0:race_time
            distance_travelled = i * (race_time - i)
            if distance_travelled > race_distances[race]
                num_ways[race] += 1
            end
        end
    end
    println(num_ways)
    return reduce(*, num_ways)
end

println(part_one("input_part_one.txt"))

function part_two(input::String) 
    lines = String.(split(read(input, String)))
    dist_index = findfirst(==("Distance:"), lines)
    race_time = parse(Int, join(lines[2:(dist_index - 1)]))
    race_distance = parse(Int, join(lines[(dist_index + 1):end]))
    num_ways = 0
    for i in 0:race_time
        distance_travelled = i * (race_time - i)
        if distance_travelled > race_distance
            num_ways += 1
        end
    end
    return num_ways
end

println(part_two("input_part_two.txt"))
