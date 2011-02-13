def run_specs
  system("clear")
  system("env node specs.js")
end

watch('^(spec/(.*)\.js)') { |m| run_specs }

run_specs

# vim:ft=ruby
