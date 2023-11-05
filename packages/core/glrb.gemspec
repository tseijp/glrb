# frozen_string_literal: true

require_relative "lib/utils/version"

Gem::Specification.new do |spec|
  spec.name = "glrb"
  spec.version = Glrb::VERSION
  spec.authors = ["tseijp"]
  spec.email = ["_@tsei.jp"]

  spec.summary = "glrb is a simple OpenGL wrapper for Ruby"
  spec.description = "glrb is a simple OpenGL wrapper for Ruby"
  spec.homepage = "https://tsei.jp"
  spec.license = "MIT"
  spec.required_ruby_version = ">= 2.6.0"

  spec.metadata["allowed_push_host"] = "https://rubygems.org"

  spec.metadata["homepage_uri"] = spec.homepage
  spec.metadata["source_code_uri"] = "https://github.com/tseijp/glrb"
  spec.metadata["changelog_uri"] = "https://github.com/tseijp/glrb"

  # Specify which files should be added to the gem when it is released.
  # The `git ls-files -z` loads the files in the RubyGem that have been added into git.
  spec.files = Dir.chdir(__dir__) do
    `git ls-files -z`.split("\x0").reject do |f|
      (File.expand_path(f) == __FILE__) ||
        f.start_with?(*%w[bin/ test/ spec/ features/ .git .circleci appveyor Gemfile])
    end
  end

  spec.bindir = "exe"
  spec.executables = spec.files.grep(%r{\Aexe/}) { |f| File.basename(f) }
  spec.require_paths = ["lib"]

  spec.add_development_dependency "bundler"
  spec.add_development_dependency "rake"
  spec.add_development_dependency "rspec"

  # For more information and examples about making a new gem, check out our
  # guide at: https://bundler.io/guides/creating_gem.html
end
