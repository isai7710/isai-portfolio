---
title: "My Neovim Installation"
date: "2024-09-04"
description: "A brief tutorial on installing Neovim from source on a WSL 2 environment running the Ubuntu distribution"
coverImage: "/assets/background.jpg"
---

## How I installed Neovim from source on my WSL 2 environment running Ubuntu

1. Installed prerequisites: `sudo apt-get install ninja-build gettext cmake unzip curl build-essential`
2. Cloned the neovim repository into my `~/repos` folder: `git clone https://github.com/neovim/neovim ~/repos`
3. Ran `cd ~/repos/neovim` and checked out the stable branch with `git checkout stable`
4. I wanted Neovim installed in a specific directory, namely in my own `~/src` directory. Why? I guess simply to keep things organized. The official neovim repo said installing in the default `/usr/local` directory can [complicate](https://github.com/neovim/neovim/blob/master/INSTALL.md#install-from-source) uninstallation. In any case, we have to build it first by running the following command with some cmake flags:

`make CMAKE_EXTRA_FLAGS="-DCMAKE_INSTALL_PREFIX=$HOME/neovim" CMAKE_BUILD_TYPE=RelWithDebInfo`

(Note you can change the build type here, I went with RelWithDebInfo, best of both worlds.)

5. Run the installation with `make install`
6. Add this line to your .bashrc file: `export PATH="$HOME/src/neovim/bin:$PATH"`
   and run `source .bashrc` to make the changes permanent.

Check everything is working by running `nvim --version`. Your output should look something like:

```
NVIM v0.10.0
Build type: RelWithDebInfo
LuaJIT 2.1.1713484068
Run "nvim -V1 -v" for more info
```

7. Now if you want some configuration files, create the config directory with `mkdir -p ~/.config/nvim` and either start writing your own lua configs or fork them from this repository or others if you want. Go crazy.

### Another quick note on Lua and Luarocks

Since I'm using lazy.nvim, one of the requirements is to have luarocks installed. Here's how I got the default installation of Lua and Luarocks under /usr/local:

1. Ensure you have the build prerequisites: `sudo apt install build-essential libreadline-dev unzip`
2. Run the following to build and install **Lua** (download package tar ball, extract, build and install) you can use wget too.

```
curl -R -O http://www.lua.org/ftp/lua-5.3.5.tar.gz
tar -zxf lua-5.3.5.tar.gz
cd lua-5.3.5
make linux test
sudo make install
```

3. Run the following to build and install **Luarocks** (same deal as above but with wget, download and extract tar ball, build and install)

```
wget https://luarocks.org/releases/luarocks-3.11.1.tar.gz
tar zxpf luarocks-3.11.1.tar.gz
cd luarocks-3.11.1
./configure && make && sudo make install
```

Test you have both with `lua -v` and `luarocks --version`