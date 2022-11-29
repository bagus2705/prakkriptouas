#include<stdio.h> 
#include<math.h> 
int gcd(int a, int h) 
{ 
    int temp; 
    while (1) 
    { 
        temp = a%h; 
        if (temp == 0) 
          return h; 
        a = h; 
        h = temp; 
    } 
} 

int main() 
{ 
    float p = 3; 
    float q = 7; 
  
    float n = p*q; 
  
    float e = 2; 
    float phi = (p-1)*(q-1); 
    while (e < phi) 
    { 
        if (gcd(e, phi)==1) 
            break; 
        else
            e++; 
    } 
  
    int k = 2;
    float d = (1 + (k*phi))/e; 
  
    float msg = 20; 
  
    printf("Message data = %f", msg); 
  
    float c = pow(msg, e); 
    c = fmod(c, n); 
    printf("\nEncrypted data = %f", c); 
  
    float m = pow(c, d); 
    m = fmod(m, n); 
    printf("\nOriginal Message Sent = %f", m); 
  
    return 0; 
} 
