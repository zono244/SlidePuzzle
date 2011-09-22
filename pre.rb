
File.open("./problems.txt") { |file|
  i = 0;
  file.readlines.each do |line|
    if (i < 2) then
      i += 1;
      next;
    end
    File.open('./problem/p' + (i-2).to_s + '.txt', 'w') { |out|
      out.write(line);
    }
    i += 1;
  end
}