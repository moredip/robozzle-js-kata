SOURCE_FILES = FileList["src/**/*.js"]

desc "launch node repl"
task :repl do
  system %Q|NODE_PATH="./src:./lib" node|
end

desc "run jslint against files"
task :jslint do
  sh %Q|nodelint ./#{SOURCE_FILES.join(' ')}|
end

desc "run unit tests"
task :utest do
  sh %Q|./specs.sh|
end

task :default => [:jslint,:utest]
