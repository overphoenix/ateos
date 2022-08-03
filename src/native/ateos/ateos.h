#ifndef __ATEOS_H_
#define __ATEOS_H_

#undef ATEOS_OS_LINUX
#undef ATEOS_OS_WINDOWS
#undef ATEOS_OS_MACOS
#undef ATEOS_OS_FREEBSD
#undef ATEOS_OS_SOLARIS

#undef ATEOS_ARCH_IA32
#undef ATEOS_ARCH_AMD64

// os detection
#if defined(linux) || defined(__linux) || defined(__linux__) || defined(__TOS_LINUX__)
#define ATEOS_OS_LINUX 1
#elif defined(_WIN32) || defined(__WIN64)
#define ATEOS_OS_WINDOWS 1
#elif defined(__FreeBSD__) || defined(__FreeBSD__kernel__)
#define ATEOS_OS_FREEBSD 1
#elif defined(__APPLE__) || (__TOC_MACOS__)
#define ATEOS_OS_MACOS 1
#elif defined(sun) || defined(__sun)
#define ATEOS_OS_SOLARIS 1
#endif

// arch detection
#if defined(i386) || defined(__i386) || defined(__i386__) || defined(_M_IX86)
#define ATEOS_ARCH_IA32 1
#elif defined(__x86_64__) || defined(_M_X64)
#define ATEOS_ARCH_AMD64 1
#endif

#include <v8.h>
#include <node.h>
#include <node_version.h>
#include <node_buffer.h>
#include <node_object_wrap.h>
#include <fcntl.h>
#include <errno.h>
#include <sys/types.h>
#include <wchar.h>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <nan.h>

using namespace v8;
using namespace node;

// Unmaybe overloading to conviniently convert from Local/MaybeLocal/Maybe to Local/plain value
template <class T>
inline Local<T> Unmaybe(Local<T> h) {
    return h;
}
template <class T>
inline Local<T> Unmaybe(Nan::MaybeLocal<T> h) {
    assert(!h.IsEmpty());
    return h.ToLocalChecked();
}
template <class T>
inline T Unmaybe(Nan::Maybe<T> h) {
    assert(h.IsJust());
    return h.FromJust();
}

#define NanStr(x) (Unmaybe(Nan::New<String>(x)))

#define THROW_BAD_ARGS Nan::ThrowTypeError("Bad argument")

#if ATEOS_OS_WINDOWS
#pragma warning( disable : 4244 )
#include <windows.h>
#else
#include <unistd.h>
#endif // ATEOS_OS_WINDOWS

#endif // __ATEOS_H_
