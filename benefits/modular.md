---
layout: page
title: webrogue's modularity
---

As mentioned in explanation of webrogue's [portability](./portable.html), apps are distributed as __mods__. 
In context of webrogue the word "mod" stands for "module". 

Webrogue does not differs apps and modifications, so they are unified under term "mods".

Mod's code is a relocatable WebAssembly static archive. It makes it possible to merge code of all mods into one on the fly. See [linking](../in_depth/linking.html) for details.
