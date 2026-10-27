import cv2,numpy as np
A=cv2.imread('More_RX7.jpg')   # aurora (target frame)
B=cv2.imread('RX7_Black_Seats.png') # clean
ga=cv2.cvtColor(A,cv2.COLOR_BGR2GRAY); gb=cv2.cvtColor(B,cv2.COLOR_BGR2GRAY)
# rough init: scale
s=A.shape[1]/B.shape[1]
orb=cv2.SIFT_create(4000)
ka,da=orb.detectAndCompute(ga,None); kb,db=orb.detectAndCompute(gb,None)
m=cv2.BFMatcher().knnMatch(db,da,k=2)
good=[a for a,b in m if a.distance<0.75*b.distance]
print(len(good))
src=np.float32([kb[g.queryIdx].pt for g in good]); dst=np.float32([ka[g.trainIdx].pt for g in good])
M,inl=cv2.estimateAffinePartial2D(src,dst,ransacReprojThreshold=4)
print(M,inl.sum())
Bw=cv2.warpAffine(B,M,(A.shape[1],A.shape[0]))
cv2.imwrite('warp_check.png',cv2.addWeighted(A,0.5,Bw,0.5,0))
g=cv2.cvtColor(Bw,cv2.COLOR_BGR2GRAY)
g=cv2.bilateralFilter(g,7,40,7)
e=cv2.Canny(g,40,110)
e[:int(A.shape[0]*0.10)]=0
cv2.imwrite('edges.png',255-e)
