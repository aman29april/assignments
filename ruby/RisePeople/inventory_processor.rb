# frozen_string_literal: true

require './inventory_data'

module InventoryProcessor
  extend self
  Pair = Struct.new(:i, :j, :path)


  # Time Complexity: O(n) where n is size of products
  # Space Complexity: O(1)
  def product_most_in_stock
    most_stocked = InventoryData.products[0]
    InventoryData.products.each do |product|
      most_stocked = product if most_stocked[:instock_count] < product[:instock_count]
    end
    most_stocked
  end

  # Time Complexity: O(n) where n is size of products
  # Space Complexity: O(n)  where n is size of products
  def inventory_clusters
    # Using rails method
    # InventoryData.products.group_by{|product| product[:categories]}.values

    # without using rails inbuilt method
    result = {}
    InventoryData.products.each do |product|
      key = product[:categories]
      result[key] = result.fetch(key, []) << product
    end
    result.values
  end

  # Time Complexity: O(n * t) where n is number of products and t is target calories
  # Space Complexity: O(n * t)
  def recommend_products(max_calories)
    products = InventoryData.products
    products_count = products.length

    ## METHOD 1: Brutforce Approach##
    # return products_by_brutforce(max_calories, products)

    ## METHOD 2: USING Dynamic Programming##
    # To save memory, factor can be used.
    # all calories values will be divided by factor as for current data set, values are multiples of 10
    # example  if target is 1500, value will become 1500 / 10 => 150
    # similarly, calories of each product will also be factored.
    factor = 10
    dp = build_dp(products, max_calories, factor)

    possible_products = backtrack_dp(dp, max_calories, factor)
    return [] if possible_products.empty?

    possible_products.sample.to_a.map { |index| products[index] }
  end

  private


  #find closest target sum, starting from the last element of DP array
  def get_closest_cell(dp, max_calories, factor)
    i = InventoryData.products.count
    j = max_calories / factor

    j -= 1 while j > 0 && !dp[i][j]
    return i, j
  end

  def backtrack_dp(dp, max_calories, factor=1)
    i, j = get_closest_cell(dp, max_calories, factor) # if we do not have exact match, try to reduce calories

    # if no possible products with the target calories
    return [] if j.zero?

    possible_products = []
    products = InventoryData.products
    queue = []
    queue << Pair.new(i, j, [])

    # look up in the dp array to find the list of products with calories sum as dp[j]
    while queue.any?
      current = queue.shift

      # if we reached bounds, i.e. first row or column
      if current.i.zero? || current.j.zero?
        possible_products << current.path
        next
      end

      excluded = dp[current.i - 1][current.j] # upper cell

      # If upper cell is true, means there is possibility that current product is not included
      queue << Pair.new(current.i - 1, current.j, current.path) if excluded

      current_product = products[current.i - 1]
      remaining_calories = current_product[:serving_calories] / factor
      if current.j >= remaining_calories
        remaining_calories = current.j - remaining_calories

        # if current product is included and check if possibility with remaining calories
        included = dp[current.i - 1][remaining_calories]
        next unless included

        # add product index in path
        queue << Pair.new(current.i - 1, remaining_calories, current.path.dup.push(current.i - 1))
      end
    end
    possible_products
  end

  def build_dp(products, max_calories, factor=1)
    dp = Array.new(products.count + 1) { Array.new(max_calories / factor + 1, false) }
    dp.each_with_index do |row, i|
      row.each_with_index do |_val, j|
        if j.zero? # first column
          dp[i][j] = true
        elsif i.zero? # first row
          dp[i][j] = false
        else
          # if jth product is not included, and with upper cell, target is possible,
          # take value from upper cell
          if dp[i - 1][j]
            dp[i][j] = true
            next
          end

          current_product = products[i - 1]
          product_calories = current_product[:serving_calories] / factor

          # target value is equal or greater then current value.
          # So we can include this product
          if j >= product_calories && (dp[i - 1][j - product_calories] == true)
            # if with inclusion, remaining calories can be made by previous products?
            dp[i][j] = true
          end
        end
      end
    end
    dp
  end

  # Using array combinations and try every possible array subsequence
  def products_by_brutforce(max_calories, products)
    1.upto(products.count).to_a.shuffle.each do |n|
      products.combination(n).to_a.shuffle.each do |n_products|
        if n_products.map { |product| product[:serving_calories] }.inject(:+) <= max_calories
          return n_products
        end
      end
    end
    []
  end
end
