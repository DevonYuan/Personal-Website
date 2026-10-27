import cv2,numpy as np,base64,re
e=cv2.imread('edges.png',0); e=255-e
A=cv2.imread('More_RX7.jpg')
cs,_=cv2.findContours(e,cv2.RETR_LIST,cv2.CHAIN_APPROX_NONE)
cs=[c for c in cs if len(c)>=40]
# order roughly left->right so the drawing sweeps across
cs.sort(key=lambda c:c[:,0,0].min())
d=[]
for c in cs:
    h=c[:len(c)//2+1]  # contour doubles back on 1px lines; keep one pass
    a=cv2.approxPolyDP(h,0.9,False)[:,0,:]
    if len(a)<2: continue
    d.append('M'+' '.join(f'{x} {y}' for x,y in a))
paths=''.join(f'<path d="{p}" pathLength="1" style="--i:{i}"/>' for i,p in enumerate(d))
poles='<path d="M140 168V312" pathLength="1" style="--i:0"/><path d="M784 152V310" pathLength="1" style="--i:0"/>'
ok,buf=cv2.imencode('.jpg',A,[cv2.IMWRITE_JPEG_QUALITY,82])
img='data:image/jpeg;base64,'+base64.b64encode(buf).decode()
html=open('tpl.html').read().replace('%%PATHS%%',poles+paths).replace('%%IMG%%',img)
open('about-me.html','w').write(html)
print(len(d),len(html)//1024,'KB')
