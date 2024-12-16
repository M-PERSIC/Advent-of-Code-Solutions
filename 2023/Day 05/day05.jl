# SPDX-License-Identifier: MIT

# Advent of Code 2023
# --- Day 5: If You Give A Seed A Fertilizer ---
# Michael A. Persico (M-PERSIC)
# https://github.com/M-PERSIC

function part_one(input::String)
    maps = split(readchomp(input), "\n\n")
    seeds = parse.(Int, split(maps[1])[2:end])
    for map in maps[2:end]
        source_ranges, dest_range_starts = Vector{UnitRange}(), Vector{Int}()
        seed_ranges = split(map, "\n")[2:end]
        for seed_range in seed_ranges
            seed_range_nums = parse.(Int, String.(split(seed_range)))
            push!(
                source_ranges,
                UnitRange(seed_range_nums[2], seed_range_nums[2] + seed_range_nums[3] - 1),
            )
            push!(dest_range_starts, seed_range_nums[1])
        end
        for (seed_index, seed) in enumerate(seeds)
            for (source_range_index, source_range) in enumerate(source_ranges)
                if seed in source_range
                    seeds[seed_index] =
                        dest_range_starts[source_range_index] + (seed - source_range.start)
                    break
                end
            end
        end
    end
    return minimum(seeds)
end

# println(part_one("input_part_one.txt"))

# TODO
function part_two(input::String) 
    maps = split(readchomp(input), "\n\n")
    seeds = parse.(Int, split(maps[1])[2:end])
    seeds = vcat([collect(seeds[x]:(seeds[x] + seeds[x + 1])) for x in 1:2:length(seeds) - 1]...)
    for map in maps[2:end]
        source_ranges, dest_range_starts = Vector{UnitRange}(), Vector{Int}()
        seed_ranges = split(map, "\n")[2:end]
        for seed_range in seed_ranges
            seed_range_nums = parse.(Int, String.(split(seed_range)))
            push!(
                source_ranges,
                UnitRange(seed_range_nums[2], seed_range_nums[2] + seed_range_nums[3] - 1),
            )
            push!(dest_range_starts, seed_range_nums[1])
        end
        for (seed_index, seed) in enumerate(seeds)
            for (source_range_index, source_range) in enumerate(source_ranges)
                if seed in source_range
                    seeds[seed_index] =
                        dest_range_starts[source_range_index] + (seed - source_range.start)
                    break
                end
            end
        end
    end
    return minimum(seeds)
end

println(part_two("input_part_two.txt"))
