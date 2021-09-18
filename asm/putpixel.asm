org 100h

section .text

start:
        mov     ax, 0013h
        int     10h
        mov     ax, 0a000h
        mov     es, ax
        xor     ax, ax
        mov     cx, 32000d
        xor     di, di
        rep     stosw

        xor     bx, bx
        xor     dx, dx
        mov     al, 2
        call    putpixel1
        mov     bx, 1
        mov     dx, 1
        mov     al, 4
        call    putpixel1
        mov     bx, 2
        mov     dx, 2
        mov     al, 15d
        call    putpixel1
        xor     ah, ah
        int     16h

        mov     bx, 3
        mov     dx, 3
        mov     al, 2
        call    putpixel2
        mov     bx, 4
        mov     dx, 4
        mov     al, 4
        call    putpixel2
        mov     bx, 5
        mov     dx, 5
        mov     al, 15d
        call    putpixel2
        xor     ah, ah
        int     16h

        mov     bx, 6
        mov     dx, 6
        mov     al, 2
        call    putpixel3
        mov     bx, 7
        mov     dx, 7
        mov     al, 4
        call    putpixel3
        mov     bx, 8
        mov     dx, 8
        mov     al, 15d
        call    putpixel3
        xor     ah, ah
        int     16h

        mov     bx, 9
        mov     dx, 9
        mov     al, 2
        call    putpixel4
        mov     bx, 10d
        mov     dx, 10d
        mov     al, 4
        call    putpixel4
        mov     bx, 11d
        mov     dx, 11d
        mov     al, 15d
        call    putpixel4
        xor     ah, ah
        int     16h

        mov     bx, 12d
        mov     dx, 12d
        mov     al, 2
        call    putpixel5
        mov     bx, 13d
        mov     dx, 13d
        mov     al, 4
        call    putpixel5
        mov     bx, 14d
        mov     dx, 14d
        mov     al, 15d
        call    putpixel5
        xor     ah, ah
        int     16h

        mov     ax, 0003h
        int     10h
        mov     ax, 4c00h
        int     21h


putpixel1:
        mov     cx, 0a000h      ; 3 / 2
        mov     es, cx          ; 2 / 2
        imul    di, dx, 320d    ; 4 / 15
        add     di, bx          ; 2 / 2
        stosb                   ; 1 / 4
        ret

putpixel2:
        mov     cx, 0a000h      ; 3 / 2
        mov     es, cx          ; 2 / 2
        mov     di, dx          ; 2 / 2
        shl     di, 8           ; 3 / 3
        shl     dx, 6           ; 3 / 3
        add     di, dx          ; 2 / 2
        add     di, bx          ; 2 / 2
        mov     [es:di], al     ; 3 / 2
        ret

putpixel3:
        mov     cx, 0a000h      ; 3 / 2
        mov     es, cx          ; 2 / 2
        shl     dx, 6           ; 3 / 3
        mov     di, dx          ; 2 / 2
        shl     dx, 2           ; 3 / 3
        add     di, dx          ; 2 / 2
        mov     [es:bx+di], al  ; 3 / 2
        ret

putpixel4:
        mov     cx, 0a000h      ; 3 / 2
        mov     es, cx          ; 2 / 2
        add     bh, dl          ; 2 / 2
        shl     dx, 6           ; 3 / 3
        add     bx, dx          ; 2 / 2
        mov     [es:bx], al     ; 3 / 2
        ret

putpixel5:
        mov     cx, 0a000h              ; 3 / 2
        mov     es, cx                  ; 2 / 2
        lea     edx, [edx*4+edx]        ; 6 / 2
        shl     edx, 6                  ; 3 / 3
        mov     [es:ebx+edx], al        ; 5 / 2
        ret
