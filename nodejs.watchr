def run_specs
  system 'clear'
  # need to set PATH so nodelint can be found
  system %Q|PATH="$PATH:/usr/local/share/npm/bin" rake|
end

watch('^(spec/(.*)\.js)') { |m| run_specs }
watch('^(src/(.*)\.js)') { |m| run_specs }

run_specs

# vim:ft=ruby
