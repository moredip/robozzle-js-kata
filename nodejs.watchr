def run_specs
  system 'clear'
  system %q|env NODE_PATH="./src" node specs.js|
end

watch('^(spec/(.*)\.js)') { |m| run_specs }
watch('^(src/(.*)\.js)') { |m| run_specs }

run_specs

# vim:ft=ruby
