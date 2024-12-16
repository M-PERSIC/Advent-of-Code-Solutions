# SPDX-License-Identifier: MIT-0
# License-Filename: LICENSE

# Advent of Code 2023
# --- Day 2: Cube Conundrum ---
# Michael A. Persico (M-PERSIC)
# https://github.com/M-PERSIC

function part_one(input::String)
    sum = 0
    cube_pattern = r"((\b\d+\b)\sred)|((\b\d+\b)\sblue)|((\b\d+\b)\sgreen)"
    game_ID_pattern = r"(?<=Game)\s(\b\d+\b)(?=:)"
    for line in readlines(input)
        possible = true
        for cube in eachmatch(cube_pattern, line)
            num_cubes, cube_colour = split(cube.match, " ")
            num_cubes = parse(Int, num_cubes)
            if (cube_colour == "red" && num_cubes > 12) ||
               (cube_colour == "green" && num_cubes > 13) ||
               (cube_colour == "blue" && num_cubes > 14)
                possible = false
            end
        end
        if possible
            sum += parse(Int, match(game_ID_pattern, line)[1])
        end
    end
    return sum
end

println(part_one("input_part_one.txt"))

function part_two(input::String)
    sum = 0
    cube_pattern = r"((\b\d+\b)\sred)|((\b\d+\b)\sblue)|((\b\d+\b)\sgreen)"
    game_ID_pattern = r"(?<=Game)\s(\b\d+\b)(?=:)"
    for line in readlines(input)
        red_cube_maximum, green_cube_maximum, blue_cube_maximum = 0, 0, 0
        for cube in eachmatch(cube_pattern, line)
            num_cubes, cube_colour = split(cube.match, " ")
            num_cubes = parse(Int, num_cubes)
            if cube_colour == "red"
                red_cube_maximum = max(red_cube_maximum, num_cubes)
            elseif cube_colour == "green"
                green_cube_maximum = max(green_cube_maximum, num_cubes)
            else
                blue_cube_maximum = max(blue_cube_maximum, num_cubes)
            end
        end
        sum += red_cube_maximum * green_cube_maximum * blue_cube_maximum
    end
    return sum
end

println(part_two("input_part_two.txt"))
